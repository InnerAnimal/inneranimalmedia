# 🚀 Deployment Guide - InnerAnimal Interactive Dashboard

## 📋 Overview

This project contains an interactive web application (Claude Artifact) deployed on Cloudflare Workers with Containers.

## 🔐 Security Best Practices

### ✅ DO:
- Use `wrangler secret put` for all sensitive data
- Store public/non-sensitive config in `wrangler.jsonc`
- Use `.env` for local development only (gitignored)
- Rotate secrets regularly
- Enable 2FA on all accounts

### ❌ DON'T:
- **NEVER** commit secrets to git
- **NEVER** hardcode API keys in code
- **NEVER** share secrets in plain text
- **NEVER** use production keys locally

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Secrets (Production)

For each secret, run:

```bash
wrangler secret put SECRET_NAME
# Then paste the value when prompted
```

**Required Secrets:**
```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put CLOUDFLARE_API_TOKEN
wrangler secret put RESEND_API_KEY
wrangler secret put GITHUB_TOKEN
```

### 3. Configure Non-Sensitive Variables

Edit `wrangler.jsonc` to add non-sensitive environment variables:

```jsonc
{
  "name": "inneranimalmedia",
  "vars": {
    "SUPABASE_URL": "https://sexdnwlyuhkyvseunqlx.supabase.co",
    "ENVIRONMENT": "production"
  }
}
```

### 4. Local Development

**Note:** Local development requires Docker to be installed and running for container support.

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your development values
# Use test/development keys, NOT production!

# Ensure Docker is running
docker ps

# Start development server
npm run dev
```

**If Docker is not available:**
- You can still edit code and deploy directly to Cloudflare
- Use `wrangler deploy` to test in production
- Or use Cloudflare's preview environments

### 5. Deploy to Production

```bash
# Deploy to Cloudflare
npm run deploy

# Or with wrangler directly
wrangler deploy
```

## 🌐 Accessing Your Application

After deployment:

- **Production**: Your Cloudflare Workers URL
- **Local**: http://localhost:8787

### Available Routes:

- `/` - Interactive dashboard (main artifact)
- `/container/:id` - Specific container instance
- `/lb` - Load-balanced containers
- `/singleton` - Single container instance
- `/error` - Error handling demo

## 📊 Monitoring

View logs and metrics:

```bash
# Tail production logs
wrangler tail

# View deployment info
wrangler deployments list
```

## 🔄 Updating Secrets

To update a secret:

```bash
wrangler secret put SECRET_NAME
# Enter new value when prompted
```

To delete a secret:

```bash
wrangler secret delete SECRET_NAME
```

To list all secrets:

```bash
wrangler secret list
```

## 🏗️ Project Structure

```
inneranimalmedia/
├── src/
│   └── index.ts          # Worker entry point
├── container_src/
│   ├── main.go           # Go container server
│   └── index.html        # Interactive dashboard
├── Dockerfile            # Container image
├── wrangler.jsonc        # Cloudflare config
└── .env.example          # Environment template
```

## 🎯 Interactive Dashboard Features

The dashboard includes:

- **Project Cards**: Quick overview of active projects
- **Interactive Controls**: Real-time container info
- **Live Metrics**: Uptime, requests, and statistics
- **Responsive Design**: Works on all devices
- **Modern UI**: Gradient backgrounds and smooth animations

## 🔧 Troubleshooting

### Build Issues

```bash
# Clear build cache
rm -rf node_modules package-lock.json
npm install

# Rebuild container
wrangler deploy --force
```

### Secret Issues

```bash
# List configured secrets
wrangler secret list

# Re-add missing secret
wrangler secret put SECRET_NAME
```

### Container Issues

```bash
# Check container logs
wrangler tail --format=pretty

# View container status
wrangler deployments list
```

## 📚 Additional Resources

- [Cloudflare Containers Documentation](https://developers.cloudflare.com/containers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Best Practices](https://developers.cloudflare.com/workers/best-practices/)

## 🎉 Success!

Your interactive dashboard is now deployed and ready to use!

Visit your Workers URL to see your team's first Claude artifact in action.
