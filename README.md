### **Updated Notes: Provision AWS Resources Using Pulumi and Azure DevOps Pipeline**

---

### **Overview**
Provision AWS resources using **Pulumi** in an **Azure DevOps pipeline**. This setup combines Pulumi's Infrastructure as Code (IaC) capabilities with Azure DevOps CI/CD automation, leveraging AWS Service Connections for secure authentication.

---

### **Step-by-Step Guide**

---

#### **Step 1: Prerequisites**
Ensure the following:
1. **AWS Free Tier Account**:
   - AWS credentials (Access Key and Secret Key) configured securely.
2. **Azure DevOps Organization**:
   - Access to Azure DevOps pipelines.
3. **Pulumi Installed Locally**:
   - Verify installation:
     ```bash
     pulumi version
     ```
4. **Pulumi Project**:
   - A Pulumi project that provisions AWS resources (e.g., S3 bucket, EC2 instance).

---

#### **Step 2: AWS Credentials Setup**
Pulumi requires AWS credentials to provision resources.

##### **Option 1: Use AWS CLI Locally**
Configure AWS CLI locally:
```bash
aws configure
```
Enter your **Access Key**, **Secret Key**, and **Default Region** (e.g., `us-east-1`).

##### **Option 2: Store AWS Credentials in Azure DevOps**
1. Go to **Azure DevOps** → **Project Settings** → **Service Connections**.
2. Create a new **AWS Service Connection**:
   - Enter your **Access Key** and **Secret Key**.
   - Name the connection (e.g., `AWSConnection`).

---

#### **Step 3: Pulumi Project Setup**
Set up a Pulumi project locally to provision AWS resources.

##### **Example Pulumi Code (TypeScript)**
1. Create a Pulumi project:
   ```bash
   pulumi new aws-typescript
   ```
2. Replace the `index.ts` file with the following code:
   ```typescript
   import * as aws from "@pulumi/aws";

   // Create an S3 bucket
   const bucket = new aws.s3.Bucket("my-bucket", {
       bucket: "my-unique-bucket-name",
       acl: "private",
   });

   // Export the bucket name
   export const bucketName = bucket.id;
   ```
3. Test locally:
   - Preview changes:
     ```bash
     pulumi preview
     ```
   - Deploy resources:
     ```bash
     pulumi up
     ```

---

#### **Step 4: Push Pulumi Code to Azure DevOps Repository**
1. Commit your Pulumi project code to a Git repository.
2. Push the repository to **Azure DevOps**:
   ```bash
   git remote add origin https://dev.azure.com/<organization>/<project>/_git/<repository>
   git push -u origin main
   ```

---

#### **Step 5: Create Azure DevOps Pipeline**
Create a pipeline to automate Pulumi deployment.

##### **Pipeline Configuration**
1. Go to **Azure DevOps** → **Pipelines** → **Create Pipeline**.
2. Select the **Git Repository** containing your Pulumi code.
3. Choose **Starter Pipeline** and edit the YAML file.

##### **Updated Azure DevOps Pipeline YAML**
```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.x'
    addToPath: true
  displayName: 'Set up Python'

- script: |
    curl -fsSL https://get.pulumi.com | sh
    export PATH=$PATH:$HOME/.pulumi/bin
    pulumi version
  displayName: 'Install Pulumi'

- script: |
    npm install
    pulumi login --local
    pulumi stack select dev
    pulumi preview
    pulumi up --yes
  env:
    AWS_ACCESS_KEY_ID: $(AWS_ACCESS_KEY_ID)
    AWS_SECRET_ACCESS_KEY: $(AWS_SECRET_ACCESS_KEY)
    AWS_REGION: $(AWS_REGION)
  displayName: 'Deploy AWS Resources with Pulumi'

- task: AWSCLI@1
  inputs:
    awsServiceConnection: AWSConnection
    regionName: 'us-east-1'
    command: 's3 ls'
```

---

#### **Step 6: Add AWS Credentials to Azure DevOps Pipeline**
##### **Option 1: Use Pipeline Variables**
1. Go to **Pipelines** → **Library** → **Add Variable Group**.
2. Add the following variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

##### **Option 2: Use Service Connection**
If you created an AWS Service Connection earlier, reference it in the pipeline using the `awsServiceConnection` field.

---

#### **Step 7: Run the Pipeline**
1. Save the pipeline YAML file.
2. Run the pipeline manually or trigger it via a push to the `main` branch.
3. Monitor the pipeline logs to ensure Pulumi provisions AWS resources successfully.

---

#### **Step 8: Verify AWS Resources**
Log in to your AWS account and check the resources created by Pulumi:
- For the example above, verify the S3 bucket in the AWS Management Console.

---

### **Troubleshooting Service Connection Issue**
If the AWS Service Connection type is missing:
1. **Verify Permissions**:
   - Ensure your user role has access to **Service Connections**.
2. **Enable AWS Service Connection**:
   - Install the **AWS Toolkit for Azure DevOps** extension:
     - Go to **Organization Settings** → **Extensions** → **Manage Extensions**.
     - Install the **AWS Toolkit for Azure DevOps** from the **[Azure DevOps Marketplace](https://marketplace.visualstudio.com/)**.

If the issue persists, use the **Pipeline Variables** method instead.

---

### **Optional Enhancements**
1. **Use Pulumi Service Backend**:
   - Instead of `pulumi login --local`, use the Pulumi Service backend for collaboration:
     ```bash
     pulumi login
     ```

2. **Automate Environment-Specific Stacks**:
   - Use separate stacks (`dev`, `prod`) with pipeline variables.

3. **Add Testing**:
   - Include unit or integration tests for your Pulumi program in the pipeline.

4. **Policy as Code**:
   - Use Pulumi CrossGuard to enforce policies (e.g., no public S3 buckets).

---

### **Best Practices**
1. **Mark Secrets as Secure**:
   - Always mark sensitive variables (e.g., `AWS_SECRET_ACCESS_KEY`) as secrets in Azure DevOps.
2. **Restrict Access**:
   - Limit access to variable groups and service connections to authorized users only.
3. **Rotate Credentials Regularly**:
   - Update AWS credentials periodically in Azure DevOps.

---

### **Next Steps**
Let me know if you:
1. Face issues during setup.
2. Need help customizing the pipeline for specific AWS resources.
3. Want to add advanced features like testing, multi-stack deployments, or policy enforcement.

I’m here to guide you through each step! 😊