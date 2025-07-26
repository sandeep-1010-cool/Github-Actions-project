// Import the aws module


import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Create a new ec2 instance
const ec2Instance = new aws.ec2.Instance("my-ec2-instance", {
    ami: aws.getAmi({
        mostRecent: true,
        owners: ["amazon"],
        filters: [
            { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
        ],
    }).then(ami => ami.id),
    instanceType: "t2.micro",
    tags: {
        Name: "my-ec2-instance",
    },
});