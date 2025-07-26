//Task: Create 2 ec2 instances in different regions
//Task: Create and attach IAM + instance profile to the ec2 instances


// Import the aws module
// Import the pulumi module

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Define the regions to deploy EC2 instances in
const regions = ["us-east-1", "us-west-1"] as const;

// Create a reusable IAM role and instance profile for EC2
const ec2AssumeRolePolicy = aws.iam.getPolicyDocumentOutput({
    statements: [{
        effect: "Allow",
        principals: [{
            type: "Service",
            identifiers: ["ec2.amazonaws.com"],
        }],
        actions: ["sts:AssumeRole"],
    }],
});

// Create an IAM role for EC2 with a standard assume role policy
const iamRole = new aws.iam.Role("my-ec2-instance-role", {
    assumeRolePolicy: ec2AssumeRolePolicy.json,
});

// Create an instance profile for the EC2 role
const instanceProfile = new aws.iam.InstanceProfile("my-ec2-instance-profile", {
    role: iamRole.name,
});

// Helper to create resources per region
function createRegionResources(region: string) {
    const provider = new aws.Provider(`provider-${region}`, { region });

    const ami = aws.ec2.getAmiOutput({
        mostRecent: true,
        owners: ["amazon"],
        filters: [
            { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
        ],
    }, { provider }).id;

    const instance = new aws.ec2.Instance(`my-ec2-instance-${region}`, {
        ami,
        instanceType: "t2.micro",
        iamInstanceProfile: instanceProfile.name,
        tags: {
            Name: `my-ec2-instance-${region}`,
        },
    }, { provider });

    return { provider, ami, instance };
}

// Create resources for each region and export instance IDs
const regionResources = Object.fromEntries(
    regions.map(region => [region, createRegionResources(region)])
);

export const ec2InstanceUsEast1Id = regionResources["us-east-1"].instance.id;
export const ec2InstanceUsWest1Id = regionResources["us-west-1"].instance.id;

