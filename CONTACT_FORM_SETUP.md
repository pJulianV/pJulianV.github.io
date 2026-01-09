# 📧 Contact Form Setup Guide

## Overview
This portfolio uses Cloudflare Pages Functions to handle contact form submissions via the Resend email service.

## Current Status ⚠️
The contact form at `https://julianvargasdev.com/api/contact` needs to be configured with your Resend API key to function properly.

## Setup Instructions

### 1. Get a Resend API Key
1. Go to [Resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** in the dashboard
3. Create a new API key and copy it

### 2. Configure Cloudflare Pages
There are two ways to add your API key:

#### Option A: Via Cloudflare Dashboard (Recommended)
1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** > Select your project (`julianvargasdev.com`)
3. Navigate to **Settings** > **Environment Variables**
4. Click **Add variable**
5. Name: `RESEND_API_KEY`
6. Value: Your Resend API key
7. Environment: Select **Production** (and Preview if needed)
8. Click **Save**

#### Option B: Via Wrangler CLI
```bash
# Install Wrangler if you haven't
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Add the secret (replace YOUR_API_KEY)
wrangler pages secret put RESEND_API_KEY --project-name=julianvargasdev
# Then paste your API key when prompted
```

### 3. Deploy or Trigger Rebuild
After adding the environment variable, you need to redeploy:

1. **Automatic**: Push any change to your GitHub repository connected to Cloudflare Pages
2. **Manual**: In Cloudflare Dashboard > Pages > Your Project > Click **Create deployment**

### 4. Verify Domain (Optional but Recommended)
To use a custom sender email instead of `onboarding@resend.dev`:

1. In Resend dashboard, go to **Domains**
2. Add your domain `julianvargasdev.com`
3. Add the DNS records Resend provides
4. Update line 52 in `/functions/api/contact.js`:
   ```javascript
   from: 'Julian Vargas <noreply@julianvargasdev.com>',
   ```

## File Structure
```
/
├── functions/
│   └── api/
│       └── contact.js        # Cloudflare Pages Function (handles POST to /api/contact)
├── contact-page.html          # Contact form page
├── contact-page.js            # Form submission logic
├── _headers                   # CORS and caching headers
└── wrangler.toml             # Cloudflare configuration
```

## How It Works
1. User fills out form on `contact-page.html`
2. JavaScript (`contact-page.js`) sends POST request to `/api/contact`
3. Cloudflare Pages automatically routes to `functions/api/contact.js`
4. Function validates data and sends email via Resend API
5. User receives success/error message

## Testing Locally
To test the contact form locally:

```bash
# Install Wrangler
npm install -g wrangler

# Create .dev.vars file in root (this is gitignored)
echo "RESEND_API_KEY=your_api_key_here" > .dev.vars

# Run local development server
wrangler pages dev . --compatibility-date=2025-01-08

# Open browser to http://localhost:8788/contact-page.html
```

## Troubleshooting

### Form shows "Failed to send message"
- Check that `RESEND_API_KEY` is set in Cloudflare Pages environment variables
- Verify your Resend account is active and has email credits
- Check Cloudflare Pages Functions logs in dashboard

### CORS errors
- Ensure `_headers` file is deployed
- Check browser console for specific CORS error messages
- Verify the API endpoint URL in `contact-page.js` matches your domain

### Email not received
- Check spam/junk folder
- Verify the `to` email address in `/functions/api/contact.js` line 51
- Check Resend dashboard > **Logs** for delivery status
- If using custom domain, ensure DNS records are verified

## Cost
- **Resend Free Tier**: 100 emails/day, 3,000 emails/month (sufficient for portfolio)
- **Cloudflare Pages**: Unlimited requests, Functions included in free tier

## Security Notes
- Never commit API keys to Git
- Use environment variables for sensitive data
- Form includes email validation and spam protection
- Rate limiting handled by Cloudflare

## Support
If you encounter issues:
1. Check Cloudflare Pages deployment logs
2. Review Resend API dashboard for error details
3. Test with curl:
   ```bash
   curl -X POST https://julianvargasdev.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "subject": "Test",
       "message": "Test message"
     }'
   ```
