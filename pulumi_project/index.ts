// Import the aws module


import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Get the latest ami
const ami = aws.ec2.getAmiOutput({
    mostRecent: true,
    owners: ["amazon"],
    filters: [
        { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
    ],
});

// Create a new ec2 instance
const ec2Instance = new aws.ec2.Instance("my-ec2-instance", {
    ami: ami.id,
    instanceType: "t2.micro",
    tags: {
        Name: "my-ec2-instance",
    },
});