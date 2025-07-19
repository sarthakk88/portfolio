# 🚀 GitHub Pages Deployment Guide

Deploy your portfolio website to GitHub Pages for **FREE** hosting.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer (optional for web upload method)

## 🎯 Quick Deployment (Web Interface)

### Step 1: Create Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `yourusername.github.io` 
   - ⚠️ Replace `yourusername` with your actual GitHub username
   - ⚠️ Must be **exactly** this format for user pages
4. Set repository to **Public** (required for free GitHub Pages)
5. Don't initialize with README
6. Click **"Create repository"**

### Step 2: Upload Files
1. On the empty repository page, click **"uploading an existing file"**
2. **Drag and drop ALL files** from your portfolio folder:
   - `index.html`
   - `config.json`
   - `css/` folder
   - `js/` folder  
   - `assets/` folder
   - All other files
3. Add commit message: `"Initial portfolio upload"`
4. Click **"Commit changes"**

### Step 3: Enable GitHub Pages
1. Go to your repository **Settings** tab
2. Scroll down to **"Pages"** section (left sidebar)
3. Under **"Source"**, select **"Deploy from a branch"**
4. Choose **"main"** branch and **"/ (root)"** folder
5. Click **"Save"**

### Step 4: Access Your Site
- GitHub will show a green checkmark when ready (5-10 minutes)
- Your site will be live at: `https://yourusername.github.io`
- ✅ Share this URL on your resume and LinkedIn!

## 🔧 Troubleshooting

- **Site not loading?** Check repository name is exactly `yourusername.github.io`
- **Images not showing?** Make sure images are in `assets/images/` folder
- **Filtering not working?** Clear browser cache and try again
- **Changes not appearing?** Wait 10-15 minutes for GitHub to rebuild

## 🎨 Customization

- Edit `config.json` to update your information
- Add your photos to `assets/images/` folder
- Update project details, skills, and experience in the config file
- Site will automatically update when you push changes to GitHub

## 📧 Support

If you encounter issues, check the browser console for error messages and ensure all files are uploaded correctly.