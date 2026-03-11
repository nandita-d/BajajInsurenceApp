# Bajaj Insurance App

A modern, responsive insurance platform frontend built with React and styled with custom CSS to match Bajaj Insurance branding.

## Features

### 1. **User Authentication**
   - Login with Email or Phone Number
   - Secure authentication system
   - Password protection

### 2. **Insurance Segmentation**
   - Age-based categorization
   - Occupation selection (Student, Employee, Self-employed, etc.)
   - Insurance category selection (Health, Gadget, Motor, Personal)
   - Price sensitivity assessment

### 3. **Insurance Products**
   - Health Insurance: ₹99 to ₹9999/month
   - Gadget Insurance: ₹99 to ₹399/month
   - Motor Insurance: ₹499 to ₹899/month
   - Personal Insurance: ₹149 to ₹299/month
   - Detailed plan features and coverage information

### 4. **Account & Dashboard**
   - User profile management
   - Active policies overview
   - Premium payment tracking
   - Account settings
   - Notification preferences

### 5. **Quick Actions**
   - Pay EMI (Easy Monthly Installments)
   - Home Service booking
   - Claim filing
   - 24/7 Customer Support

### 6. **AI Chatbot**
   - 24/7 customer assistance
   - Insurance plan information
   - Pricing queries
   - Claim process guidance
   - Natural language processing for user intent

### 7. **Bajaj Branding**
   - Official Bajaj color scheme (Blue #003087 & Orange #FFA500)
   - Professional logos and branding
   - Consistent design throughout the app
   - Responsive design for all devices

## Project Structure

```
BajajInsuranceApp/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   ├── Header.js       # Navigation header
│   │   ├── Header.css
│   │   ├── Footer.js       # Footer component
│   │   ├── Footer.css
│   │   ├── Chatbot.js      # AI chatbot
│   │   └── Chatbot.css
│   ├── pages/
│   │   ├── HomePage.js     # Home page
│   │   ├── HomePage.css
│   │   ├── LoginPage.js    # Authentication
│   │   ├── LoginPage.css
│   │   ├── SegmentationPage.js   # User segmentation
│   │   ├── SegmentationPage.css
│   │   ├── InsuranceProductsPage.js  # Product selection
│   │   ├── InsuranceProductsPage.css
│   │   ├── DashboardPage.js # User dashboard
│   │   └── DashboardPage.css
│   ├── styles/
│   │   └── global.css      # Global styles
│   ├── App.js              # Main app component
│   └── index.js            # React root
├── package.json            # Dependencies
└── README.md               # This file
```

## Installation

### Asset Placement (optional but recommended)
To achieve the polished look shown in the screenshots, drop your images in the `public` folder:

- `public/bajaj-logo.png` – the Bajaj logo used in the header
- `public/hero.jpg` – background for the home page hero section
- `public/segmentation-bg.jpg` – background image for the segmentation header

If these files are missing the app will fall back to solid colours and placeholders.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Navigate to project directory**
   ```bash
   cd BajajInsuranceApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`

## Usage

### User Flow

1. **Home Page**: Browse insurance products and features
2. **Login**: Create account or login with email/phone
3. **Segmentation**: Answer questions about age, occupation, and preferences
4. **Products**: Browse and select insurance plans
5. **Create Account**: Confirm selections and create account
6. **Dashboard**: Manage policies, payments, and profile

### Chatbot

Click the floating chat button at bottom-right to:
- Ask about insurance plans
- Get pricing information
- Learn about claims process
- Get customer support

## Available Insurance Plans

### Health Insurance
- **Basic (₹99)**: ₹1 Lakh coverage
- **Premium (₹299)**: ₹5 Lakh coverage
- **Elite (₹999)**: ₹10+ Lakh coverage

### Gadget Insurance
- **Basic (₹99)**: All devices
- **Plus (₹199)**: All devices + extended features
- **Premium (₹399)**: Unlimited coverage

### Motor Insurance
- **Third Party (₹499)**: Legal liability
- **Comprehensive (₹899)**: Full coverage

### Personal Insurance
- **Standard (₹149)**: Basic coverage
- **Plus (₹299)**: Comprehensive coverage

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Custom CSS with mobile responsiveness
- **Icons**: React Icons
- **HTTP Client**: Axios (ready for backend integration)
- **State Management**: React Hooks

## Color Scheme

- **Primary**: #003087 (Bajaj Blue)
- **Secondary**: #FFA500 (Bajaj Orange)
- **Light**: #E8F1FF
- **Dark**: #001A4D
- **Text**: #333333
- **Background**: #F5F5F5

## Key Features Implementation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions

### User Experience
- Form validation
- Error handling
- Loading states
- Intuitive navigation
- Quick action buttons

### Performance
- Optimized CSS
- Smooth animations
- Lazy loading ready
- Minimal bundle size

## Future Enhancements

1. Backend API integration
2. Payment gateway integration
3. SMS/Email notifications
4. Advanced chatbot with NLP
5. Policy documents download
6. Claim status tracking
7. Video KYC
8. Multi-language support
9. Dark mode
10. Progressive Web App (PWA)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2024 Bajaj Insurance. All rights reserved.

## Support

For support, contact:
- **Email**: support@bajajinsurance.com
- **Phone**: 1800-200-200
- **Website**: www.bajajinsurance.com

---

**Built with ❤️ for Bajaj Insurance**
