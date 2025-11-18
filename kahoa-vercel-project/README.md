# Kahoa Marketing Platform - Vercel Deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Vercel CLI (`npm install -g vercel`)
- Docker (for n8n)
- Supabase account
- Various API keys (see `.env.example`)

### 1. Clone and Install

```bash
git clone https://github.com/kahoa/marketing-platform
cd marketing-platform
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your actual API keys
```

### 3. Database Setup

```bash
# Create a new Supabase project at https://supabase.com
# Copy your project URL and keys to .env.local

# Run migrations
pnpm db:push

# Seed initial data (optional)
pnpm db:seed
```

### 4. n8n Setup

```bash
# Start n8n with Docker
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access n8n at http://localhost:5678
# Import workflows from n8n-workflows/ directory
```

### 5. Local Development

```bash
pnpm dev
# Visit http://localhost:3000
```

### 6. Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables in Vercel dashboard
# Or use CLI: vercel env add VARIABLE_NAME
```

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── (marketing)/       # Marketing pages
│   ├── api/              # API routes
│   └── (auth)/           # Auth pages
├── components/           # React components
│   ├── ui/              # Shared UI components
│   ├── marketing/       # Marketing-specific
│   └── analytics/       # Tracking components
├── lib/                 # Utilities and helpers
│   ├── ai/             # AI integrations
│   ├── n8n/            # n8n webhook utilities
│   └── supabase/       # Database client
├── n8n-workflows/       # n8n workflow exports
└── public/             # Static assets
```

## 🔧 Key Features

### Marketing Automation
- **Lead Capture**: Intelligent form with real-time validation
- **Lead Scoring**: AI-powered qualification (GPT-4)
- **Email Automation**: Personalized sequences via Resend
- **LinkedIn Integration**: Profile enrichment and monitoring

### Technical Features
- **Edge Functions**: Sub-100ms API responses
- **Real-time Updates**: Supabase subscriptions
- **A/B Testing**: Built-in experimentation framework
- **Analytics**: PostHog integration with custom events

### n8n Workflows
1. **Lead Nurture**: Automated email sequences
2. **LinkedIn Monitor**: Track prospect activity
3. **Content Distribution**: Multi-channel publishing
4. **ROI Reporting**: Automated dashboards

## 🎯 Performance Targets

- **Page Load**: < 1.5s (global)
- **Lighthouse Score**: > 95
- **Conversion Rate**: > 15%
- **Uptime**: 99.9%

## 🔐 Security

- **Authentication**: NextAuth.js with JWT
- **Data Encryption**: At rest and in transit
- **Rate Limiting**: Implemented on all APIs
- **GDPR Compliant**: Privacy-first analytics

## 📊 Analytics Setup

1. **PostHog**: Product analytics
   ```javascript
   // Already configured in components/analytics/PostHogProvider.tsx
   ```

2. **Vercel Analytics**: Performance monitoring
   ```javascript
   // Automatically enabled with @vercel/analytics
   ```

3. **Custom Events**: Lead tracking
   ```javascript
   trackEvent('lead_captured', { score: 85, source: 'linkedin' });
   ```

## 🚦 Monitoring

- **Sentry**: Error tracking
- **Vercel Dashboard**: Performance metrics
- **Supabase Dashboard**: Database health
- **n8n Dashboard**: Workflow execution logs

## 📚 Documentation

- [Component Library](./docs/components.md)
- [API Reference](./docs/api.md)
- [n8n Workflows](./docs/workflows.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests: `pnpm test`
4. Submit PR

## 📞 Support

- Email: tech@kahoa.ai
- Slack: #engineering
- Docs: docs.kahoa.ai