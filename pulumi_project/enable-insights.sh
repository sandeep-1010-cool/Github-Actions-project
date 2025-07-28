#!/bin/bash

echo "🔧 Enabling Pulumi Insights..."

# Navigate to the pulumi project directory
cd "$(dirname "$0")"

# Enable insights for the dev stack
echo "Setting pulumi:insights to true..."
pulumi config set pulumi:insights true --stack dev

echo "✅ Pulumi Insights enabled!"
echo "📊 You can now view advanced visualizations in the Pulumi Console"
echo "🌐 Visit: https://app.pulumi.com/$(pulumi whoami)/pulumi-project/dev" 