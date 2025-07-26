import * as aws from "@pulumi/aws";

// Create an S3 bucket
const bucket = new aws.s3.Bucket("my-bucket", {
    bucket: "my-unique-bucket-name",
    acl: "private",
});

// Export the bucket name
export const bucketName = bucket.id;
