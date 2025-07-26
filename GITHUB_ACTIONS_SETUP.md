# GitHub Actions Setup for Pulumi

This guide explains how to set up GitHub Actions workflows for your Pulumi project.

## 📋 **Workflows Included**

### 1. **pulumi-deploy.yml** - Automated CI/CD Pipeline
- **Triggers**: Push to `main`/`develop`, Pull Requests, Manual dispatch
- **Jobs**:
  - **Test**: Runs tests and validates code
  - **Preview**: Shows changes for PRs
  - **Deploy Dev**: Deploys to development on `develop` branch
  - **Deploy Prod**: Deploys to production on `main` branch
  - **Destroy Dev**: Manual cleanup of dev environment

### 2. **pulumi-manual.yml** - Manual Deployment
- **Triggers**: Manual dispatch only
- **Features**: Choose stack (dev/prod) and action (up/preview/destroy)

## 🔧 **Required GitHub Secrets**

Add these secrets in your GitHub repository:

### **AWS Credentials**
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

### **Pulumi Access Token**
```
PULUMI_ACCESS_TOKEN=your_pulumi_access_token
```

## 🚀 **Setup Instructions**

### **Step 1: Configure GitHub Secrets**
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the required secrets listed above

### **Step 2: Set Up Environments (Optional)**
1. Go to **Settings** → **Environments**
2. Create environments:
   - `development` (for dev stack)
   - `production` (for prod stack)
3. Configure environment protection rules if needed

### **Step 3: Create Pulumi Stacks**
```bash
# Create dev stack
pulumi stack init dev

# Create prod stack
pulumi stack init prod
```

## 📊 **Workflow Usage**

### **Automatic Deployments**
- **Push to `develop`** → Deploys to dev environment
- **Push to `main`** → Deploys to production environment
- **Pull Request** → Runs tests and preview

### **Manual Deployments**
1. Go to **Actions** tab in GitHub
2. Select **Pulumi Manual Deploy**
3. Click **Run workflow**
4. Choose:
   - **Stack**: `dev` or `prod`
   - **Action**: `up`, `preview`, or `destroy`

## 🔍 **Workflow Features**

### **Security**
- ✅ Environment protection rules
- ✅ Secure credential storage
- ✅ Branch-based deployments

### **Reliability**
- ✅ Dependency caching
- ✅ Test validation
- ✅ Preview before deployment

### **Flexibility**
- ✅ Multiple environments
- ✅ Manual override options
- ✅ Destroy capabilities

## 🛠 **Customization**

### **Modify Stack Names**
Edit the workflow files and change:
- `dev` → your development stack name
- `prod` → your production stack name

### **Add More Environments**
1. Create new environment in GitHub
2. Add new job in workflow
3. Update branch conditions

### **Custom Actions**
Add custom steps like:
```yaml
- name: Custom validation
  run: |
    cd pulumi_project
    # Your custom validation logic
```

## 📝 **Example Usage**

### **Development Workflow**
1. Create feature branch
2. Make changes to Pulumi code
3. Push to `develop` branch
4. Automatic deployment to dev environment

### **Production Deployment**
1. Merge feature to `main` branch
2. Automatic deployment to production
3. Monitor deployment logs

### **Manual Cleanup**
1. Go to Actions → Pulumi Manual Deploy
2. Choose `dev` stack and `destroy` action
3. Confirm to clean up resources

## 🚨 **Troubleshooting**

### **Common Issues**
1. **Missing Secrets**: Ensure all required secrets are set
2. **Permission Errors**: Check AWS credentials and permissions
3. **Stack Not Found**: Create stacks locally first
4. **Pulumi Token**: Generate access token from Pulumi console

### **Debug Steps**
1. Check workflow logs in GitHub Actions
2. Verify secrets are correctly set
3. Test locally with same credentials
4. Check Pulumi stack status

## 📞 **Support**

For issues with the workflows:
1. Check GitHub Actions logs
2. Verify all secrets are configured
3. Test Pulumi commands locally
4. Review environment protection rules 