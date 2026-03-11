# Bajaj Insurance App - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Prerequisites
Make sure you have Node.js installed. Download from [nodejs.org](https://nodejs.org)

```bash
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

### Step 2: Clone/Download Project
```bash
cd BajajInsuranceApp
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 18
- React Router DOM v6
- React Icons
- Axios

### Step 4: Start Development Server
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

### Step 5: Start Using!

1. Click "Get Started" on the home page
2. Login with email or phone number (any credentials work in demo mode)
3. Fill in your segmentation details
4. Select insurance plans
5. View your dashboard
6. Chat with the assistant (click the chat button)

---

## 📱 Test Accounts

In demo mode, you can login with any email or phone number:

**Email**: `user@example.com` | Password: `password123`

**Phone**: `9876543210` | Password: `password123`

---

## 🎨 Key Features to Try

### Login Page
- Toggle between email and phone login
- Form validation
- Secure password field

### Segmentation
- Age validation
- Multiple insurance categories
- Occupation selection
- Price sensitivity assessment

### Insurance Products
- Filterable product list
- Price comparison
- Coverage details
- Real-time cart summary

### Dashboard
- User profile management
- Active policies overview
- Quick action buttons
- Payment EMI option

### Chatbot
- Click floating chat icon
- Ask about insurance plans
- Get instant responses
- 24/7 availability

---

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (⚠️ irreversible)
npm eject
```

---

## 📂 Project Structure

```
src/
  ├── pages/         # Page components
  ├── components/    # Reusable components
  ├── styles/        # Global styles
  ├── App.js         # Main app
  └── index.js       # Entry point

public/
  └── index.html     # HTML template
```

---

## 🎯 Main Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Introduction & features |
| Login | `/login` | User authentication |
| Segmentation | `/segmentation` | User profiling |
| Products | `/products` | Plan selection |
| Dashboard | `/dashboard` | Account management |

---

## 🌐 Responsive Design

The app is fully responsive and optimized for:
- ✅ Desktop (1920px and above)
- ✅ Tablet (768px to 1024px)
- ✅ Mobile (320px to 767px)

---

## 🤖 Chatbot Commands

Ask the chatbot about:
- **Health** Insurance details
- **Gadget** Insurance features
- **Motor** Insurance options
- **Personal** Insurance plans
- **Pricing** and affordability
- **Claims** process
- **Support** contact information
- **About** Bajaj Insurance

Example: "Tell me about health insurance"

---

## 🎨 Customization

### Change Branding Colors

Edit `src/styles/global.css`:

```css
:root {
  --bajaj-primary: #003087;      /* Main blue */
  --bajaj-secondary: #FFA500;    /* Orange accent */
  --text-primary: #333333;
  --text-secondary: #666666;
}
```

### Add Your Logo

Replace logo in `src/components/Header.js`:

```jsx
<img src="your-logo.png" alt="Logo" className="logo-image" />
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'build' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Update package.json with homepage
npm run build
npm run deploy
```

---

## 📚 Documentation Links

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [React Icons](https://react-icons.github.io/react-icons)

---

## ❓ Troubleshooting

**Port 3000 is already in use?**
```bash
# Use a different port
npm start -- --port 3001
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

**Build fails?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

---

## 💡 Next Steps

1. Connect to a backend API
2. Add payment gateway integration
3. Implement real authentication
4. Add SMS/Email notifications
5. Deploy to production

---

## 📞 Support

- **Email**: support@bajajinsurance.com
- **Phone**: 1800-200-200
- **Website**: www.bajajinsurance.com

---

## 📄 License

© 2024 Bajaj Insurance. All rights reserved.

Happy coding! 🎉
