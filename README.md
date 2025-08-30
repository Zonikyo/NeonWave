# WaterWall - Unblocked Games Website

<div align="center">
<img width="707" height="353" alt="WaterWall Logo" src="https://github.com/user-attachments/assets/0aeebfff-fd11-4366-ad35-44e1e4dab410" />

### The source code for the official [WaterWall](https://waterwallubg.netlify.app) Unblocked Games website

---

**Programmed in HTML, CSS and JavaScript. 95% of the code is completely AI Generated, the other 5% is a mix of refining the AI's code and completely organic code.**

Feel free to use this source code for your own websites, as long as proper attribution is given and you do not market the actual code as 'your own' or copyrighted.

---

## 🚀 Features

- **Single Page Application** - Smooth transitions between homepage and game pages
- **Dynamic Game Loading** - Games loaded from JSON file for easy management
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Neon Water Theme** - Beautiful dark theme with glowing aqua/blue accents
- **Search & Filter** - Find games by title, description, tags, or category
- **Local Rating System** - Rate games and see community ratings
- **No Backend Required** - Fully static, deployable anywhere

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid, Flexbox, and animations
- **Data**: JSON file for game information
- **Deployment**: Static hosting (Netlify, Vercel, GitHub Pages)

## 📁 Project Structure

```
WaterWall/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── games.json          # Game data (title, description, tags, etc.)
└── README.md           # This file
```

## 🎮 How It Works

1. **Game Data**: All games are stored in `games.json` with metadata
2. **Dynamic Rendering**: JavaScript loads games and creates interactive cards
3. **Single Page App**: Clicking a game transitions to full-screen game view
4. **iFrame Integration**: Games play in embedded iframes for seamless experience
5. **Local Storage**: Ratings and preferences saved in browser

## 🚀 Quick Start

### Option 1: Local Development
1. Clone or download this repository
2. Open `index.html` in your web browser
3. The site will work immediately with sample data

### Option 2: Live Server (Recommended)
1. Install Live Server extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Site will open in browser with hot reload

### Option 3: Deploy to Static Hosting
1. Upload all files to Netlify, Vercel, or GitHub Pages
2. Site will work immediately
3. Update `games.json` to add your own games

## 📝 Adding Games

To add new games, simply edit `games.json`:

```json
{
  "id": 13,
  "title": "Your Game Name",
  "description": "Game description here",
  "category": "Category Name",
  "tags": ["tag1", "tag2", "tag3"],
  "thumbnail": "https://your-thumbnail-url.com/image.jpg",
  "embedUrl": "https://your-game-url.com"
}
```

**Fields:**
- `id`: Unique number identifier
- `title`: Game name
- `description`: Brief game description
- `category`: Game category (appears in filter)
- `tags`: Array of searchable tags
- `thumbnail`: Image URL for game card
- `embedUrl`: URL to embed the game

## 🎨 Customization

### Colors & Theme
Edit `styles.css` to change the neon water theme:
```css
:root {
  --primary-color: #00ffff;    /* Main neon color */
  --secondary-color: #0080ff;  /* Secondary blue */
  --background: #0a0a0a;       /* Dark background */
}
```

### Layout
- **Grid Layout**: Modify `.games-grid` for different card arrangements
- **Responsive Breakpoints**: Adjust media queries in CSS
- **Animations**: Customize transition timings and effects

## 📱 Responsive Design

The site automatically adapts to:
- **Desktop**: Full grid layout with hover effects
- **Tablet**: Adjusted spacing and touch-friendly interactions
- **Mobile**: Single-column layout with optimized navigation

## 🔧 Advanced Features

### Hash Routing
Direct game access via URL: `yoursite.com/#game/1`

### Local Storage
- Game ratings persist between sessions
- User preferences saved automatically

### Performance
- Image preloading for smooth transitions
- Efficient DOM manipulation
- Minimal external dependencies

## 🚀 Deployment

### Netlify
1. Drag and drop the folder to Netlify
2. Site deploys instantly
3. Automatic HTTPS and CDN

### Vercel
1. Connect GitHub repository
2. Automatic deployments on push
3. Preview deployments for testing

### GitHub Pages
1. Enable Pages in repository settings
2. Select source branch
3. Site available at `username.github.io/repository`

## 🐛 Troubleshooting

### Games Not Loading
- Check `games.json` syntax
- Ensure file is in same directory as `index.html`
- Check browser console for errors

### Styling Issues
- Clear browser cache
- Check CSS file path
- Verify all files are present

### Performance Issues
- Optimize image sizes
- Reduce number of games in JSON
- Check for JavaScript errors

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is open source. Feel free to use, modify, and distribute as long as you provide proper attribution.

## 🌟 Credits

- **Original Concept**: WaterWall Team
- **AI Development**: Claude Sonnet 4
- **Design**: Neon water theme with modern UX principles
- **Icons**: Placeholder images (replace with your own)

## 📞 Support

For questions or support:
- Check the troubleshooting section above
- Review browser console for errors
- Ensure all files are properly linked

---

**Expected Release**: October 2025 (likely much earlier)

*WaterWall - The world's most advanced unblocked games website*
