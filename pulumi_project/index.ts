import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Create an S3 bucket with a unique name
const bucket = new aws.s3.Bucket("my-bucket", {
    // Let Pulumi generate a unique name
    bucket: pulumi.interpolate`my-unique-bucket-${pulumi.getStack()}-${pulumi.getProject()}`,
});

// Create bucket ACL resource (modern approach)
const bucketAcl = new aws.s3.BucketAcl("my-bucket-acl", {
    bucket: bucket.id,
    acl: "private",
});

// Export the bucket name
export const bucketName = bucket.id;
