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
- Check browser console for errors
- Verify `base` path in `vite.config.ts` matches your deployment path
- Ensure all assets are loading correctly

### 404 on page refresh
- Your server needs to redirect all routes to `index.html`
- Check server configuration (Nginx/Apache examples above)

### API CORS issues
- All APIs used (NASA GIBS, Open-Meteo, Nominatim) support CORS
- If issues persist, check browser console and API documentation

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/USERNAME/roamio/issues)
- Review [Vite deployment documentation](https://vitejs.dev/guide/static-deploy.html)
- Consult your hosting provider's documentation
