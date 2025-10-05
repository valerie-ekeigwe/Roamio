# Deployment Guide

This guide covers multiple deployment options for Roamio.

## Quick Deploy Options

### Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub repository
3. Netlify will auto-detect build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click "Deploy site"

#### Manual Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy with Vercel" button above
2. Import your GitHub repository
3. Vercel will auto-detect the framework (Vite)
4. Click "Deploy"

#### Manual Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Build the project
npm run build

# Deploy
vercel --prod
```

### GitHub Pages

1. Update `vite.config.ts` to set the base path:
   ```ts
   export default defineConfig({
     base: '/roamio/', // Replace with your repo name
     // ... rest of config
   })
   ```

2. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm install
           
         - name: Build
           run: npm run build
           
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

## Self-Hosting

### Prerequisites
- Node.js 18+ or Bun
- A web server (Nginx, Apache, Caddy, etc.)

### Build for Production

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

The built files will be in the `dist` directory.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/roamio/dist;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/roamio/dist

    <Directory /path/to/roamio/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Enable URL rewriting for SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>
</VirtualHost>
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t roamio .
docker run -p 8080:80 roamio
```

## Environment Variables

Roamio uses public APIs and doesn't require API keys. However, you can customize behavior with environment variables (see `.env.example`).

To use environment variables in production:
- **Netlify/Vercel**: Add them in the dashboard under Settings → Environment Variables
- **Self-hosted**: Create `.env.production` file (not committed to git)

## Performance Optimization

### Enable CDN
Consider using a CDN like Cloudflare for:
- Faster global content delivery
- DDoS protection
- SSL/TLS certificates
- Caching

### Monitoring
Recommended monitoring tools:
- **Sentry** - Error tracking
- **Google Analytics** - Usage analytics
- **LogRocket** - Session replay
- **Vercel Analytics** - Performance monitoring (if using Vercel)

## Troubleshooting

### Blank page after deployment
**Symptoms:** White screen, no content visible

**Solutions:**
1. Open browser DevTools Console (F12) and check for errors
2. Verify `base` path in `vite.config.ts` matches your deployment path
   - GitHub Pages: `base: '/repository-name/'`
   - Root domain: `base: '/'`
3. Check Network tab to ensure all assets (JS, CSS) are loading correctly
4. Verify build completed successfully: `ls -la dist/` should show `index.html` and `assets/` folder
5. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### 404 on page refresh (SPA routing issue)
**Symptoms:** Clicking links works, but refreshing the page shows 404

**Root Cause:** Server doesn't know about client-side routes

**Solutions by Platform:**
- **Netlify:** Create `public/_redirects` file:
  ```
  /* /index.html 200
  ```
- **Vercel:** No action needed (auto-configured)
- **GitHub Pages:** Add `404.html` that redirects to `index.html`
- **Nginx/Apache:** See server configuration examples above

### Map tiles not loading
**Symptoms:** Gray squares instead of satellite imagery

**Solutions:**
1. Check browser console for CORS or network errors
2. Verify NASA GIBS service status: https://status.earthdata.nasa.gov/
3. Test with different satellite layers (some may have temporary outages)
4. Ensure firewall/proxy isn't blocking tile requests
5. Try accessing tiles directly in browser: `https://gibs.earthdata.nasa.gov/...`

### Weather data not displaying
**Symptoms:** No weather information after clicking location

**Solutions:**
1. Check Open-Meteo API status: https://open-meteo.com/
2. Verify location coordinates are valid (lat: -90 to 90, lng: -180 to 180)
3. Check browser console for API errors
4. Ensure date is within supported range (typically last 7 days + 14 day forecast)
5. Test API directly: `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41`

### Build fails with memory errors
**Symptoms:** `JavaScript heap out of memory` during build

**Solutions:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or use Bun (faster, more efficient)
bun install
bun run build
```

### Slow initial load time
**Optimization checklist:**
- [ ] Enable gzip/brotli compression on server
- [ ] Configure CDN (Cloudflare, CloudFront)
- [ ] Enable asset caching headers (1 year for hashed files)
- [ ] Verify code splitting in build output
- [ ] Use `npm run build -- --sourcemap` to analyze bundle size
- [ ] Consider lazy loading satellite layers

### API CORS issues
**Symptoms:** `Access-Control-Allow-Origin` errors

**Solutions:**
- All APIs used (NASA GIBS, Open-Meteo, Nominatim) natively support CORS
- If behind corporate proxy, whitelist:
  - `*.earthdata.nasa.gov`
  - `api.open-meteo.com`
  - `nominatim.openstreetmap.org`
- Check browser console for specific error messages
- Test APIs with `curl` to rule out network issues

### Environment variables not working
**Symptoms:** Features behave differently than development

**Checklist:**
1. Verify variables are prefixed with `VITE_` (required for Vite)
2. Restart dev server after changing `.env` files
3. For production platforms:
   - **Netlify:** Add in Site settings → Environment variables
   - **Vercel:** Add in Project settings → Environment Variables
   - **GitHub Pages:** Use GitHub Secrets in workflow file
4. Never commit `.env` files to Git (use `.env.example` instead)
5. Check build logs to confirm variables are available

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/USERNAME/roamio/issues)
- Review [Vite deployment documentation](https://vitejs.dev/guide/static-deploy.html)
- Consult your hosting provider's documentation
