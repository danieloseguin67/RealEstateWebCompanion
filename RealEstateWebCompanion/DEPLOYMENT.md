# GitHub Pages Deployment - Single Branch Workflow

This project uses GitHub Actions to automatically deploy to GitHub Pages from the `main` branch only.

## ✅ Setup Complete

The repository is now configured with:
- **Single branch workflow** (main branch only)
- **Automatic deployment** via GitHub Actions
- **Correct base href**: `/RealEstateWebCompanion/`

## 🔧 GitHub Repository Settings Required

To complete the setup, configure GitHub Pages in your repository:

1. Go to your repository on GitHub: `https://github.com/danieloseguin67/RealEstateWebCompanion`
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and folder `/ (root)`
4. Click **Save**

## 🚀 How It Works

1. When you push to the `main` branch, GitHub Actions automatically:
   - Installs dependencies
   - Builds the Angular app with production configuration
   - Deploys the built files to the `gh-pages` branch
   
2. GitHub Pages serves the site from the `gh-pages` branch

## 📝 Deployment Commands

- **Push changes to trigger deployment:**
  ```bash
  git add .
  git commit -m "Your commit message"
  git push
  ```

- **Manual deployment (if needed):**
  ```bash
  npm run deploy
  ```

## 🌐 Live URL

After deployment completes, your site will be available at:
**https://danieloseguin67.github.io/RealEstateWebCompanion/**

## 🔑 Login Credentials

Use these credentials to access the application:

1. **Jessica Larmour**
   - Username: `jessica.larmour`
   - Password: `cev28Lev$`

2. **Daniel Seguin**
   - Username: `daniel.seguin`
   - Password: `Dajmet202"`

3. **Jane Doe**
   - Username: `jane.doe`
   - Password: `Mcpf[nLO\26;`

## ⚙️ GitHub Actions Workflow

The workflow file is located at: `.github/workflows/deploy.yml`

Key features:
- Triggers on push to `main`
- Uses Node.js 20
- Builds with production configuration
- Handles SPA routing with 404.html
- Deploys to `gh-pages` branch automatically

## 🔍 Monitoring Deployments

- Check deployment status: Go to the **Actions** tab in your GitHub repository
- View deployment logs: Click on any workflow run
- Deployment typically takes 2-3 minutes

## ❓ Troubleshooting

**If the site shows a blank page:**
- Clear browser cache (Ctrl+F5)
- Check that GitHub Pages is set to deploy from `gh-pages` branch

**If routing doesn't work:**
- The workflow includes 404.html for SPA routing
- Make sure the base-href matches your repository name

**If build fails:**
- Check the Actions tab for error logs
- Ensure all dependencies are in package.json
