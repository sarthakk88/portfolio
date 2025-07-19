# 🚀 Modern Portfolio Website - GitHub Pages Ready

A clean, professional portfolio website showcasing your AI/ML expertise and projects at PwC. Features a responsive design, dark mode, and dynamic content loading.

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence  
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dynamic Content**: Easy updates through config.json file
- **Fast Loading**: Optimized performance with minimal dependencies
- **SEO Optimized**: Proper meta tags and semantic markup
- **Accessible**: WCAG compliant with proper keyboard navigation

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── app.js             # JavaScript functionality (FIXED)
├── config.json        # Your data and content (EDITABLE)
├── assets/
│   └── images/        # Your photos and project images
│       └── profile.jpg # Add your profile photo here
└── README.md          # This file
```

## 🚀 Quick Deployment to GitHub Pages

### Method 1: Direct Upload (Easiest)

1. **Create GitHub Repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click "New" repository
   - Name it exactly: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - Make it **Public**
   - Don't initialize with README (we have our own files)
   - Click "Create repository"

2. **Upload Your Files**
   - Extract the ZIP file you downloaded
   - In your new GitHub repository, click "uploading an existing file"
   - Drag and drop all files from the extracted folder
   - Add commit message: "Initial portfolio upload"
   - Click "Commit changes"

3. **Add Your Profile Photo**
   - In your repository, click "Create new file"
   - Type: `assets/images/profile.jpg`
   - Upload your profile photo (recommended: 300x300px, square aspect ratio)
   - Commit the file

4. **Enable GitHub Pages**
   - Go to repository **Settings**
   - Scroll to **Pages** section
   - Source: "Deploy from a branch"
   - Branch: **main** / **root**
   - Click "Save"

5. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io`
   - It may take 5-10 minutes to become available

### Method 2: Using Git Commands

```bash
# Clone your repository
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io

# Copy all portfolio files to this directory
# Add your profile photo to assets/images/profile.jpg

# Add and commit files
git add .
git commit -m "Initial portfolio upload"
git push origin main
```

## 🎨 Customization Guide

### Editing Your Information

All your personal information is stored in `config.json`. Simply edit this file to update:

- **Personal Info**: Name, title, email, bio
- **Social Links**: GitHub, LinkedIn, etc.
- **Skills**: Organized by categories
- **Projects**: Your GenAI and ML projects
- **Experience**: Work history
- **Education**: Academic background

### Adding Project Images

1. Add your project screenshots to `assets/images/`
2. Update the image paths in `config.json`
3. Recommended image size: 400x250px for consistency

### Changing Colors/Theme

The website uses CSS custom properties for easy theming. In `style.css`, you can modify:

```css
:root {
  --color-primary: #3B82F6;        /* Main accent color */
  --color-background: #FFFFFF;      /* Background color */
  --color-text: #1F2937;           /* Text color */
}
```

## 🐛 Troubleshooting

### Common Issues

**Site not loading?**
- Wait 10-15 minutes after enabling GitHub Pages
- Check repository name is exactly `yourusername.github.io`
- Ensure repository is **Public**

**Images not showing?**
- Verify images are in `assets/images/` folder
- Check image file names match config.json exactly
- Ensure images are web-optimized (JPG/PNG, under 1MB)

**Projects not filtering correctly?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for JavaScript errors

**Contact form not working?**
- The form uses `mailto:` which opens the user's email client
- This is the standard approach for static GitHub Pages sites

## 📈 Performance Tips

- **Optimize Images**: Compress images to under 1MB each
- **Monitor Loading**: Use browser dev tools to check performance
- **Cache Issues**: Add `?v=2` to CSS/JS files if updates aren't showing

## 🔧 Advanced Configuration

### Custom Domain Setup

1. Buy a domain (e.g., yourname.com)
2. In your repository settings, add custom domain
3. Update your domain's DNS to point to GitHub Pages:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```

### Analytics Integration

Add Google Analytics by inserting this before `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📱 Mobile Optimization

The site is fully responsive and optimized for:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adapted grid)
- **Mobile**: 320px-767px (single column)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly

## 🔒 Security & Best Practices

- **HTTPS**: Automatically enabled by GitHub Pages
- **No Sensitive Data**: Never commit API keys or passwords
- **Contact Security**: Uses mailto: instead of server-side processing

## 📞 Support

If you encounter any issues:

1. Check this README for common solutions
2. Verify all files are uploaded correctly
3. Clear browser cache and try again
4. Check GitHub Pages status in repository settings

## 🎯 Next Steps After Deployment

1. **Test Thoroughly**: Check all links and functionality
2. **Add Content**: Upload project images and update descriptions
3. **Share Your URL**: Add to your resume, LinkedIn, etc.
4. **Regular Updates**: Keep projects and skills current
5. **Monitor Analytics**: Track visitors and popular content

---

**🚀 Ready to deploy?** Follow the steps above and your professional portfolio will be live in minutes!

**💡 Pro Tip**: Bookmark your GitHub repository for easy updates to your portfolio content.
