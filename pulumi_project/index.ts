// Task: Create and attach IAM + instance profile to the ec2 instances
// Task: Create 2 ec2 instances in different regions
// Task: Apply standardized AWS tags + environment names: "dev", "test"
// Task: Use init scripts to install Wiz Sensor
// Task: Export the EC2 instance IDs

import * as aws from "@pulumi/aws";

// Define regions and environment names
const regions = [
    { name: "us-east-1", env: "dev" },
    { name: "us-west-2", env: "test" }
];

// Standardized AWS tags
const baseTags = {
    "Project": "WizSensorDeployment",
    "Owner": "YourTeam",
    "CostCenter": "12345"
};

// User data script to install Wiz Sensor (replace with actual script as needed)
const wizSensorUserData = `#!/bin/bash
echo "Installing Wiz Sensor..."
curl -o wiz-installer.sh https://wiz-installer.s3.amazonaws.com/wiz-installer.sh
chmod +x wiz-installer.sh
./wiz-installer.sh --install
`;

// Helper function to create resources for a region
function createEc2WithIam(regionInfo: { name: string, env: string }) {
    // Create a provider for the specific region
    const provider = new aws.Provider(`provider-${regionInfo.env}`, {
        region: regionInfo.name,
    });

    // Create IAM role
    const role = new aws.iam.Role(`wiz-role-${regionInfo.env}`, {
        assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "ec2.amazonaws.com" }),
        tags: {
            ...baseTags,
            "Environment": regionInfo.env,
        },
    }, { provider });

    // Attach a managed policy (e.g., AmazonSSMManagedInstanceCore for SSM access)
    new aws.iam.RolePolicyAttachment(`wiz-role-attach-${regionInfo.env}`, {
        role: role.name,
        policyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    }, { provider });

    // Create instance profile  
    const instanceProfile = new aws.iam.InstanceProfile(`wiz-profile-${regionInfo.env}`, {
        role: role.name,
        tags: {
            ...baseTags,
            "Environment": regionInfo.env,
        },
    }, { provider });

    // Get latest Amazon Linux 2 AMI
    const ami = aws.ec2.getAmi({
        mostRecent: true,
        owners: ["amazon"],
        filters: [
            { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
            { name: "state", values: ["available"] },
        ],
    }, { provider });

    // Create EC2 instance
    return ami.then(a =>
        new aws.ec2.Instance(`wiz-ec2-${regionInfo.env}`, {
            ami: a.id,
            instanceType: "t3.micro",
            iamInstanceProfile: instanceProfile.name,
            userData: wizSensorUserData,
            tags: {
                ...baseTags,
                "Environment": regionInfo.env,
            },
        }, { provider })
    );
}

// Create EC2 instances in different regions
const instances = regions.map(createEc2WithIam);

// Export the EC2 instance IDs
export const ec2InstanceUsEast1Id = instances[0].id;
export const ec2InstanceUsWest2Id = instances[1].id;














