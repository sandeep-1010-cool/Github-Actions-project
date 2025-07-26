// Import the aws module
// Import the pulumi module

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Define the regions to deploy EC2 instances in
const regions = ["us-east-1", "us-west-1"] as const;

// Create a provider, get the latest Amazon Linux 2 AMI, and launch an EC2 instance for each region
type RegionResources = {
    provider: aws.Provider;
    ami: pulumi.Output<string>;
    instance: aws.ec2.Instance;
};

const regionResources: Record<string, RegionResources> = {};

for (const region of regions) {
    // Create a provider for the region
    const provider = new aws.Provider(`provider-${region}`, { region });

    // Get the latest Amazon Linux 2 AMI for the region
    const ami = aws.ec2.getAmiOutput({
        mostRecent: true,
        owners: ["amazon"],
        filters: [
            { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
        ],
    }, { provider }).id;

    // Create the EC2 instance
    const instance = new aws.ec2.Instance(`my-ec2-instance-${region}`, {
        ami,
        instanceType: "t2.micro",
        tags: {
            Name: `my-ec2-instance-${region}`,
        },
    }, { provider });

    regionResources[region] = { provider, ami, instance };
}

// Export the EC2 instance IDs for each region
export const ec2InstanceUsEast1Id = regionResources["us-east-1"].instance.id;
export const ec2InstanceUsWest1Id = regionResources["us-west-1"].instance.id;
