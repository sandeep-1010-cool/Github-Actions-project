 # AWS TypeScript Pulumi Template with CI/CD

A production-ready Pulumi template for provisioning AWS infrastructure using TypeScript with comprehensive CI/CD pipeline, security scanning, and code quality checks.

## 🚀 Features

- **Infrastructure as Code**: AWS S3 bucket provisioning with TypeScript
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Security Scanning**: CodeQL, dependency vulnerability scanning, and secret detection
- **Code Quality**: ESLint, Prettier, and TypeScript compilation checks
- **Sequential Workflow**: Quality gates ensure safe deployments
- **Manual Controls**: Workflow dispatch for manual deployments and destruction

## 📋 Prerequisites

- Pulumi CLI (>= v3): https://www.pulumi.com/docs/get-started/install/
- Node.js (>= 18): https://nodejs.org/
- AWS credentials configured (e.g., via `aws configure` or environment variables)
- GitHub repository with configured secrets

## 🔧 Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `PULUMI_ACCESS_TOKEN` | Pulumi access token for state management | `pul-xxxxxxxxxxxxxxxxxxxx` |
| `AWS_ACCESS_KEY_ID` | AWS access key for infrastructure deployment | `AKIAXXXXXXXXXXXXXXXX` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for infrastructure deployment | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `AWS_REGION` | AWS region for deployment (optional, defaults to us-east-1) | `us-east-1` |

## 🏗️ Project Structure

```
├── .github/workflows/
│   └── pulumi-workflow.yml    # CI/CD pipeline
├── pulumi_project/
│   ├── index.ts               # Main Pulumi program
│   ├── package.json           # Dependencies and scripts
│   ├── tsconfig.json          # TypeScript configuration
│   ├── .eslintrc.js          # ESLint configuration
│   ├── .prettierrc           # Prettier configuration
│   ├── Pulumi.yaml           # Pulumi project metadata
│   └── README.md             # This file
└── README.md                 # Root project documentation
```

## 🔄 CI/CD Workflow

The GitHub Actions workflow follows a sequential process:

### 1. Code Quality & Security
- ✅ TypeScript compilation check
- ✅ ESLint code quality validation
- ✅ Security audit (npm audit)
- ✅ Dependency vulnerability scanning
- ✅ Code formatting check (Prettier)
- ✅ Secret scanning
- ✅ CodeQL security analysis

### 2. Testing
- ✅ Unit tests execution
- ✅ Pulumi validation

### 3. Preview
- ✅ Infrastructure change preview
- ✅ Resource validation

### 4. Deployment
- ✅ Infrastructure deployment (only after all checks pass)

## 🚀 Getting Started

### Local Development

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd pulumi_project
   npm install
   ```

2. **Configure Pulumi**:
   ```bash
   pulumi stack select dev || pulumi stack init dev
   pulumi config set aws:region us-east-1
   ```

3. **Preview and deploy**:
   ```bash
   pulumi preview
   pulumi up
   ```

### Automated Deployment

1. **Push to main/develop branches**: Triggers automatic deployment
2. **Create pull request**: Triggers preview and validation
3. **Manual workflow dispatch**: Use GitHub Actions for manual operations

## 📝 Available Scripts

```bash
# Code quality
npm run lint              # ESLint check
npm run format            # Prettier formatting
npm run format:check      # Check formatting
npm run type-check        # TypeScript compilation

# Security
npm run security-audit    # Dependency vulnerability scan

# Pulumi
npm run validate          # Pulumi validation
```

## 🔒 Security Features

- **Secret Scanning**: Detects hardcoded secrets in code
- **Dependency Scanning**: Identifies vulnerable packages
- **CodeQL Analysis**: Advanced security scanning by GitHub
- **Type Safety**: TypeScript compilation prevents type-related issues
- **Code Quality**: ESLint enforces coding standards

## 🎯 Configuration

| Key | Description | Default |
|-----|-------------|---------|
| `aws:region` | AWS region for deployment | `us-east-1` |

Use `pulumi config set <key> <value>` to customize configuration.

## 🔄 Workflow Triggers

- **Push to main/develop**: Full CI/CD pipeline with deployment
- **Pull Request to main**: Quality checks and preview only
- **Manual workflow dispatch**: Manual control for specific actions

## 🛠️ Manual Operations

Use GitHub Actions workflow dispatch for:

- **Preview**: `action: preview` - Shows infrastructure changes
- **Deploy**: `action: up` - Deploys infrastructure
- **Destroy**: `action: destroy` - Removes infrastructure

## 📚 Next Steps

- Extend `index.ts` to provision additional AWS resources
- Add more comprehensive tests
- Configure additional security scanning tools
- Set up monitoring and alerting
- Explore [Pulumi AWSX](https://www.pulumi.com/docs/reference/pkg/awsx/) for higher-level components

## 🆘 Getting Help

- Check GitHub Actions logs for detailed error information
- Review Pulumi documentation: https://www.pulumi.com/docs/
- Open an issue in this repository for bugs or feature requests

## 📄 License

This project is licensed under the MIT License.