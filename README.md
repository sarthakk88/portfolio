# Sarthak Singh - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features dark mode, smooth animations, and easy configuration through a JSON file.

## Features

- 🎨 Modern, clean design with smooth animations
- 🌙 Dark/Light mode toggle with localStorage persistence
- 📱 Fully responsive design for all devices
- 🚀 Fast loading with optimized performance
- 📝 Easy content management through config.json
- 🎯 SEO optimized with proper meta tags
- ♿ Accessible design following WCAG guidelines
- 📧 Contact form with mailto integration
- 🔍 Project filtering and search functionality

## Quick Setup

1. **Download & Extract**: Extract the ZIP file to your desired location
2. **Edit Config**: Update `config.json` with your personal information
3. **Add Images**: Place your photos in the `assets/images/` folder
4. **Deploy**: Follow the deployment instructions below

## Configuration

All your personal information is stored in `config.json`. Simply edit this file to update:

- Personal information (name, title, contact details)
- Social media links
- Skills and technologies
- Project details
- Work experience
- Education background
- Theme colors

### Example config.json structure:
```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com"
  },
  "projects": [
    {
      "title": "Project Name",
      "category": "web",
      "description": "Project description",
      "technologies": ["React", "Node.js"],
      "github": "https://github.com/username/project",
      "demo": "https://project-demo.com"
    }
  ]
}
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Create Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `yourusername.github.io` (replace with your GitHub username)
   - Make it public

2. **Upload Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Access Your Site**:
   - Your site will be available at `https://yourusername.github.io`
   - It may take 5-10 minutes to go live

### Option 2: Netlify

1. **Prepare Files**:
   - Ensure all files are in a single folder
   - Create a ZIP file of your portfolio folder

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop your ZIP file to the deploy area
   - Your site will be live instantly with a random subdomain

3. **Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain

### Option 3: Vercel

1. **Upload to GitHub** (if not done already)
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── config.json         # Your editable configuration
├── css/
│   └── styles.css      # Modern CSS styles
├── js/
│   └── main.js         # JavaScript functionality
├── assets/
│   └── images/         # Your photos and project images
├── .nojekyll          # Prevents Jekyll processing
└── README.md          # This file
```

## Adding Your Images

1. **Profile Photo**: Add `profile.jpg` to `assets/images/`
2. **About Photo**: Add `about.jpg` to `assets/images/`
3. **Project Images**: Add project screenshots as specified in config.json

### Recommended Image Sizes:
- Profile photo: 400x400px (square)
- About photo: 600x400px (landscape)
- Project images: 800x450px (16:9 ratio)

## Customization

### Colors
Edit the `:root` section in `css/styles.css` to change colors:
```css
:root {
    --primary-color: #3B82F6;
    --secondary-color: #1E40AF;
    --accent-color: #F59E0B;
}
```

### Fonts
The site uses Inter font from Google Fonts. To change:
1. Update the Google Fonts link in `index.html`
2. Update `--font-family` in CSS

### Adding Sections
To add new sections:
1. Add HTML structure in `index.html`
2. Add corresponding styles in `css/styles.css`
3. Add JavaScript functionality in `js/main.js` if needed

## Local Development

To run locally:
1. Open terminal in the portfolio folder
2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have it)
   npx serve .

   # VS Code Live Server extension
   Right-click index.html → Open with Live Server
   ```
3. Open `http://localhost:8000` in your browser

## Troubleshooting

### Common Issues:

1. **Site Not Loading**:
   - Check file paths are correct
   - Ensure `index.html` is in the root directory
   - Wait 10-15 minutes for GitHub Pages deployment

2. **Images Not Showing**:
   - Verify image files exist in `assets/images/`
   - Check image names match those in `config.json`
   - Ensure images are web-optimized (JPG/PNG)

3. **Config Not Loading**:
   - Verify `config.json` syntax is valid
   - Use a JSON validator if needed
   - Check for trailing commas

4. **Dark Mode Not Working**:
   - Clear browser localStorage
   - Check browser console for JavaScript errors

### Performance Tips:

- Optimize images (use tools like TinyPNG)
- Keep config.json under 100KB
- Minimize custom CSS additions
- Use modern image formats (WebP) when supported

## Updates

To update your portfolio:
1. Edit `config.json` with new information
2. Replace images in `assets/images/`
3. Commit and push changes to GitHub
4. Site will automatically redeploy

## Support

For issues or questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all file paths are correct
- Validate JSON syntax in config.json

## License

This portfolio template is free to use for personal and commercial projects.

---

Made with ❤️ by Sarthak Singh
