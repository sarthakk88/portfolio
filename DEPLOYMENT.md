# 🚀 GitHub Pages Deployment Guide

Deploy your portfolio website to GitHub Pages for **FREE** hosting with your own custom domain.

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

## ⚡ Advanced Deployment (Git Commands)

If you prefer using Git commands:

```bash
# Clone your repository
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io

# Copy all portfolio files to this directory

# Add and commit files
git add .
git commit -m "Add portfolio website"
git push origin main
```

Then follow Step 3 above to enable Pages.

## 🔧 Alternative Hosting Options

### Netlify (Recommended for advanced features)
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Deploy automatically on every push
4. **Benefits**: Forms, serverless functions, custom redirects

### Vercel
1. Sign up at [vercel.com](https://vercel.com)  
2. Import your GitHub repository
3. Automatic deployments
4. **Benefits**: Edge functions, analytics, preview deployments

### Surge.sh (Quick deployment)
```bash
npm install -g surge
cd your-portfolio-folder
surge
```

## 📝 Important Notes

### Repository Naming
- **User Site**: `username.github.io` → `https://username.github.io`
- **Project Site**: `any-name` → `https://username.github.io/any-name`

### GitHub Pages Limitations
- Only static files (HTML, CSS, JS)
- No server-side processing
- 1GB repository size limit
- 100GB bandwidth per month (very generous)

## 🛠️ Updating Your Site

### Method 1: Web Interface
1. Navigate to any file in your repository
2. Click the **pencil icon** to edit
3. Make changes
4. Scroll down, add commit message
5. Click **"Commit changes"**
6. Changes appear in 5-10 minutes

### Method 2: Git Commands
```bash
# Make your changes locally
git add .
git commit -m "Update portfolio content"
git push origin main
```

## 🎨 Customizing Your Portfolio

### Update Personal Information
1. Edit `config.json` file
2. Update personal_info section
3. Commit changes

### Add New Projects  
1. Edit `config.json`
2. Add new project objects to projects array
3. Add project images to `assets/images/`
4. Commit all changes

### Change Colors/Styling
1. Edit `css/style.css`
2. Modify CSS custom properties (variables)
3. Commit changes

## 🔧 Troubleshooting

### Site Not Loading?
- ✅ Check repository name is exactly `username.github.io`
- ✅ Ensure repository is **public**
- ✅ Verify Pages is enabled in Settings
- ✅ Wait 10-15 minutes after first deployment

### Images Not Showing?
- ✅ Check file paths in `config.json`
- ✅ Ensure images are in `assets/images/` folder
- ✅ File names must match exactly (case-sensitive)
- ✅ Use relative paths: `assets/images/filename.jpg`

### Form Not Working?
- ✅ Forms use `mailto:` (opens email client)
- ✅ For backend forms, consider Netlify or Vercel

### CSS/JS Not Loading?
- ✅ Check file paths in `index.html`
- ✅ Ensure files are in correct folders
- ✅ Clear browser cache (Ctrl+F5)

## 🎯 Best Practices

### Performance
- Optimize images (compress before uploading)
- Keep files under 100MB total
- Use modern image formats (WebP for better compression)

### SEO
- Update `<title>` and `<meta>` tags in `index.html`
- Add descriptive alt text to images
- Use semantic HTML structure

### Security
- Don't commit sensitive information
- Use environment variables for APIs (not needed for this static site)

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:

1. Get tracking code from [Google Analytics](https://analytics.google.com)
2. Add tracking script to `index.html` before `</head>`
3. Commit changes

## 🎉 Next Steps

After deployment:
1. ✅ Test your site on multiple devices
2. ✅ Share the URL on LinkedIn and resume
3. ✅ Set up custom domain (optional)
4. ✅ Add your site to Google Search Console
5. ✅ Keep your projects updated regularly

## 🆘 Need Help?

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Community Forum](https://github.community/)
- Email: sarthak.snhsingh104@gmail.com

---

🚀 **Your portfolio will be live at `https://yourusername.github.io` within 10 minutes!**
