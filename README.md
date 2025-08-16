# 🌍 Destination Booking - Travel Booking Platform

A modern, full-stack travel booking application built with React, TypeScript, and Firebase. Discover amazing destinations, book flights, hotels, and create unforgettable travel experiences.

## ✨ Features

### 🏠 **Home Dashboard**
- Interactive hero section with rotating destination showcases
- Popular destinations carousel with ratings and pricing
- About us section highlighting travel services
- Responsive design with stunning travel imagery

### 🗺️ **Destination Exploration**
- Browse curated destinations with detailed information
- High-quality destination images and descriptions
- Filter and search functionality
- Destination ratings and pricing information

### 📅 **Booking Management**
- Secure booking system with user authentication
- Real-time booking status tracking
- Booking history and management
- Interactive booking forms with validation

### 🔐 **User Authentication**
- Firebase Authentication integration
- Protected routes for authenticated users
- User registration and login system
- Secure session management

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Beautiful animations and transitions
- Intuitive navigation with React Router
- Tailwind CSS for modern styling

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling and validation
- **React Day Picker** - Date selection components

### Backend & Database
- **Firebase** - Authentication and Firestore database
- **Firestore** - NoSQL cloud database

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aSriram199/Destination-Booking.git
   cd travel-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Add your Firebase configuration to `src/utils/config.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
travel-booking/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── navbar.tsx      # Navigation component
│   │   └── ui/             # UI component library
│   ├── pages/              # Application pages
│   │   ├── Home.tsx        # Landing page
│   │   ├── Destinations.tsx # Destination browsing
│   │   ├── Bookings.tsx    # Booking management
│   │   ├── BookDestination.tsx # Booking details
│   │   ├── Explore.tsx     # Destination exploration
│   │   └── signup.tsx      # Authentication
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   │   ├── config.ts       # Firebase configuration
│   │   └── firestore.ts    # Database operations
│   └── lib/                # Library utilities
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Update `src/utils/config.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🌟 Key Features

### Authentication System
- Secure user registration and login
- Protected routes for authenticated users
- Automatic session management

### Destination Management
- Curated destination listings
- High-quality imagery and descriptions
- Pricing and rating information
- Interactive exploration features

### Booking System
- Real-time booking creation
- Booking status tracking
- User booking history
- Form validation and error handling

### Responsive Design
- Mobile-first approach
- Cross-browser compatibility
- Smooth animations and transitions
- Intuitive user interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**A. Sriram**
- GitHub: [@aSriram199](https://github.com/aSriram199)

## 🙏 Acknowledgments

- Unsplash for beautiful travel imagery
- Radix UI for accessible components
- Firebase for backend services
- The React and TypeScript communities

---

**Ready to start your next adventure?** 🚀 Book your dream destination today!
