# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### Method 1: Using GitHub Web Interface (Easiest)

1. **Create GitHub Account**: Go to github.com and create an account if you don't have one

2. **Create New Repository**:
   - Click the "+" icon in top right corner
   - Select "New repository"
   - Name: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it Public
   - DO NOT initialize with README
   - Click "Create repository"

3. **Upload Files**:
   - You'll see an empty repository page
   - Click "uploading an existing file"
   - Drag and drop ALL files from your portfolio folder
   - Write commit message: "Initial portfolio upload"
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository Settings tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

5. **Wait and Access**:
   - GitHub will show a green checkmark when ready (5-10 minutes)
   - Your site will be available at: `https://yourusername.github.io`

### Method 2: Using Git Commands (Advanced)

1. **Install Git**: Download from git-scm.com

2. **Open Terminal/Command Prompt** in your portfolio folder

3. **Run Commands**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

4. **Enable Pages**: Follow steps 4-5 from Method 1

## Important Notes:

- Repository MUST be named exactly `yourusername.github.io`
- Replace `yourusername` with your actual GitHub username
- Repository must be PUBLIC for free GitHub Pages
- Changes take 5-10 minutes to appear on live site
- Edit config.json anytime to update your information

## Troubleshooting:

**Site not loading?**
- Check repository name is exactly `yourusername.github.io`
- Ensure repository is public
- Wait 10-15 minutes for propagation

**Images not showing?**
- Add your actual photos to `assets/images/` folder
- Update config.json with correct image names

**Want to update content?**
- Edit config.json
- Upload changes to GitHub
- Site updates automatically
