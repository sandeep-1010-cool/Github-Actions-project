# 🚀 **Step-by-Step Pulumi AWS TypeScript Setup**

Let me guide you through setting up Pulumi with AWS and TypeScript from scratch.

---

## 📋 **Prerequisites Check**

### **Step 1: Verify Required Tools**
```bash
# Check Node.js (required for TypeScript)
node --version
# Should be v14+ (recommended v18+)

# Check npm
npm --version

# Check if Pulumi is installed
pulumi version

# Check AWS CLI
aws --version
```

**If any are missing:**
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Install Pulumi (if not installed)
curl -fsSL https://get.pulumi.com | sh

# Install AWS CLI (if not installed)
# Windows: Download from AWS website
# macOS: brew install awscli
# Linux: sudo apt install awscli
```

---

## 🔧 **Step 2: AWS Configuration**

### **Configure AWS Credentials**
```bash
# Method 1: Interactive configuration
aws configure

# You'll be prompted for:
# AWS Access Key ID: [Enter your access key]
# AWS Secret Access Key: [Enter your secret key]
# Default region name: us-west-2
# Default output format: json
```

### **Verify AWS Setup**
```bash
# Test AWS connection
aws sts get-caller-identity

# Expected output:
# {
#     "UserId": "AIDACKCEVSQ6C2EXAMPLE",
#     "Account": "123456789012",
#     "Arn": "arn:aws:iam::123456789012:user/your-username"
# }
```

---

## 🏗️ **Step 3: Create Project Directory**

```bash
# Navigate to your desired location
cd ~/Desktop

# Create project directory
mkdir pulumi-aws-typescript-project
cd pulumi-aws-typescript-project

# Verify you're in the right place
pwd
```

---

## 🎯 **Step 4: Initialize Pulumi Project**

### **Login to Pulumi**
```bash
# Option 1: Pulumi Cloud (Recommended)
pulumi login

# This will open your browser for authentication
# Follow the prompts to create/login to your account
```

### **Create New Project**
```bash
# Create AWS TypeScript project
pulumi new aws-typescript

# You'll see interactive prompts like this:
```

### **Interactive Prompts & Responses:**
```bash
This command will walk you through creating a new Pulumi project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

project name: (pulumi-aws-typescript-project) ✅ Press ENTER
project description: (A minimal AWS TypeScript Pulumi program) My first AWS TypeScript project
Created project 'pulumi-aws-typescript-project'

Please enter your desired stack name.
To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
stack name: (dev) ✅ Press ENTER
Created stack 'dev'

aws:region: The AWS region to deploy to (us-east-1) us-west-2
Saved config

Installing dependencies...
npm install
# ... dependency installation output ...

Finished installing dependencies

Your new project is ready to go! ✨

To perform an initial deployment, run 'pulumi up'
```

---

## 📁 **Step 5: Explore Project Structure**

```bash
# List project files
ls -la

# Expected structure:
# .
# ├── .gitignore
# ├── Pulumi.yaml          # Project configuration
# ├── Pulumi.dev.yaml      # Stack-specific config
# ├── index.ts             # Main TypeScript program
# ├── node_modules/        # Dependencies
# ├── package.json         # Node.js dependencies
# ├── package-lock.json    # Dependency lock file
# └── tsconfig.json        # TypeScript configuration
```

### **Examine the Generated Code**
```bash
# Look at the main program
cat index.ts
```

**You'll see something like:**

> **AI Prompt:** "Create a TypeScript code snippet for a Pulumi AWS project that sets up an S3 bucket with static website hosting. The code should import Pulumi and AWS modules, create an S3 bucket with website configuration, add an HTML file as a bucket object with 'Hello, world!' content, and export both the bucket name and website endpoint URL."

---

## 🚀 **Step 6: First Deployment**

### **Preview Changes**
```bash
# See what will be created (dry run)
pulumi preview

# Expected output:
# Previewing update (dev)
# 
# Type                    Name                                Plan       
# +   pulumi:pulumi:Stack  pulumi-aws-typescript-project-dev  create     
# +   ├─ aws:s3:Bucket     my-bucket                          create     
# +   └─ aws:s3:BucketObject index.html                       create     
# 
# Resources:
#     + 3 to create
```

### **Deploy Infrastructure**
```bash
# Deploy the resources
pulumi up

# You'll be prompted:
# Do you want to perform this update? yes

# Expected output:
# Updating (dev)
# 
# Type                    Name                                Status      
# +   pulumi:pulumi:Stack  pulumi-aws-typescript-project-dev  created     
# +   ├─ aws:s3:Bucket     my-bucket                          created     
# +   └─ aws:s3:BucketObject index.html                       created     
# 
# Outputs:
#     bucketEndpoint: "http://my-bucket-1234567.s3-website-us-west-2.amazonaws.com"
#     bucketName    : "my-bucket-1234567"
# 
# Resources:
#     + 3 created
# 
# Duration: 10s
```

---

## 🔍 **Step 7: Verify Deployment**

### **Check Stack Outputs**
```bash
# View stack outputs
pulumi stack output

# Expected output:
# Current stack outputs (2):
#     OUTPUT          VALUE
#     bucketEndpoint  http://my-bucket-1234567.s3-website-us-west-2.amazonaws.com
#     bucketName      my-bucket-1234567
```

### **Test the Website**
```bash
# Get the website URL
pulumi stack output bucketEndpoint

# Visit the URL in your browser or use curl
curl $(pulumi stack output bucketEndpoint)

# Expected: <html><body><p>Hello, world!</p></body></html>
```

### **Check AWS Console**
- Go to AWS S3 Console
- You should see your bucket listed
- Check the bucket contents

---

## 🛠️ **Step 8: Modify and Update**

### **Edit the TypeScript Code**
```bash
# Open index.ts in your editor
code index.ts  # VS Code
# or
nano index.ts  # Terminal editor
```

**Update the content:**

> **AI Prompt:** "Create a comprehensive TypeScript Pulumi code for AWS multi-region EC2 deployment with the following requirements:
> 
> 1. **Multi-Region Setup**: Deploy 2 EC2 instances across 2 AWS regions (us-west-2 and us-east-1)
> 
> 2. **IAM Configuration**: 
>    - Create IAM roles with necessary permissions for EC2 instances
>    - Create instance profiles and attach IAM roles
>    - Include policies for EC2, CloudWatch, and Systems Manager access
> 
> 3. **EC2 Instance Configuration**:
>    - Use t3.micro instance type
>    - Latest Amazon Linux 2 AMI
>    - Attach the created instance profiles
>    - Configure security groups allowing SSH (port 22) and HTTP (port 80)
> 
> 4. **Wiz Sensor Installation**:
>    - Create user data scripts that install Wiz sensor on instance startup
>    - Include system updates and basic security configurations
>    - Add logging for installation verification
> 
> 5. **Standardized AWS Tags**:
>    - Apply consistent tags across all resources
>    - Include: Environment (dev/test), Project, Owner, CostCenter, CreatedBy
>    - Use environment names 'dev' for us-west-2 and 'test' for us-east-1
> 
> 6. **Resource Organization**:
>    - Use clear naming conventions
>    - Group related resources logically
>    - Include proper TypeScript interfaces for configuration
> 
> 7. **Outputs**:
>    - Export instance IDs, public IPs, and regions
>    - Export IAM role ARNs
>    - Export security group IDs
> 
> Include proper error handling, resource dependencies, and TypeScript type definitions. Structure the code with functions for reusability and maintainability."

### **Deploy Updates**
```bash
# Preview changes
pulumi preview

# Deploy updates
pulumi up

# Test the updated infrastructure
pulumi stack output
```

---

## 🧹 **Step 9: Cleanup (Optional)**

### **Destroy Resources**
```bash
# Preview what will be destroyed
pulumi destroy --dry-run

# Destroy all resources
pulumi destroy

# Confirm with: yes

# Remove the stack
pulumi stack rm dev
```

---

## 📚 **Step 10: Next Steps & Advanced Examples**

### **Add More AWS Resources**

> **AI Prompt:** "Create TypeScript code for Pulumi that adds AWS VPC infrastructure to an existing project. Include: 1) A VPC with CIDR block 10.0.0.0/16, DNS hostnames and support enabled, tagged as 'main-vpc', 2) A subnet within the VPC with CIDR 10.0.1.0/24 in availability zone us-west-2a, tagged as 'main-subnet', 3) Export statements for VPC ID and subnet ID."

### **Environment-Specific Configuration**
```bash
# Create production stack
pulumi stack init prod

# Set different config for prod
pulumi config set aws:region us-east-1

# Deploy to production
pulumi up --stack prod
```

### **Use Configuration Values**

> **AI Prompt:** "Create TypeScript code for Pulumi that demonstrates configuration management. Include: 1) Import Pulumi config module, 2) Get configuration values for 'bucketName' with default 'my-default-bucket' and 'environment' with default 'dev', 3) Create an S3 bucket using both config values in the name format 'bucketName-environment', 4) Show how to use these configuration values in resource creation."

```bash
# Set config values
pulumi config set bucketName myapp
pulumi config set environment production
```

---

## 🎯 **Common Commands Reference**

```bash
# Project Management
pulumi new aws-typescript    # Create new project
pulumi preview              # Preview changes
pulumi up                   # Deploy changes
pulumi destroy              # Destroy resources

# Stack Management
pulumi stack ls             # List stacks
pulumi stack select dev     # Switch to dev stack
pulumi stack output         # Show outputs
pulumi stack export         # Export stack state

# Configuration
pulumi config set key value # Set config
pulumi config get key       # Get config value
pulumi config               # List all config

# State Management
pulumi refresh              # Refresh state
pulumi import               # Import existing resources
pulumi state delete         # Remove resource from state
```

---

## 🐛 **Troubleshooting**

### **Common Issues & Solutions**

#### **Issue 1: AWS Credentials**
```bash
# Error: No valid credential sources found
aws configure list
aws sts get-caller-identity
```

#### **Issue 2: TypeScript Compilation Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
npm run build
```

#### **Issue 3: Dependency Issues**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### **Issue 4: Stack State Issues**
```bash
# Refresh stack state
pulumi refresh

# Force unlock if stuck
pulumi cancel
```

---

## ✅ **Success Checklist**

- [ ] ✅ Node.js and npm installed
- [ ] ✅ Pulumi CLI installed and logged in
- [ ] ✅ AWS CLI configured with credentials
- [ ] ✅ Project created with `pulumi new aws-typescript`
- [ ] ✅ First deployment successful with `pulumi up`
- [ ] ✅ Resources visible in AWS Console
- [ ] ✅ Stack outputs accessible
- [ ] ✅ Website accessible via browser
- [ ] ✅ Code modifications deployed successfully

**🎉 Congratulations! You now have a working Pulumi AWS TypeScript setup!**

You can now start building more complex infrastructure with the power of TypeScript's type safety and Pulumi's infrastructure-as-code capabilities! 🚀