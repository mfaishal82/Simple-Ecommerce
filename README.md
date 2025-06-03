# SimpleMART

SimpleMART is an e-commerce project built with Vite + React during a vibe coding session. The project focuses on creating a modern, responsive e-commerce platform with a clean user interface and smooth user experience.

This is a frontend-only implementation built using Vite as the build tool and React as the UI framework, leveraging existing third-party APIs for backend functionality. Instead of building a custom backend, the project demonstrates integration with well-established APIs to handle data management, authentication, and payment processing.

## Features

- 🛍️ Product browsing and filtering by categories
- 🔍 Real-time search functionality with responsive design
- 🛒 Shopping cart management
- 💳 Secure payment integration with Xendit
- 👤 User authentication
- 📱 Fully responsive design
- 🗺️ Interactive maps for location display
- 📍 Geolocation with custom markers

## Architecture Overview

This project is structured as a frontend-only application:

- 🎯 **Frontend Focus**: Pure React-based frontend implementation
- 🔌 **API Integration**: Uses third-party APIs for backend functionality
- 💾 **Data Management**: 
  - Product data from Fake Store API
  - Authentication via Fake Store Auth API
  - Payment processing through Xendit API
- 🔒 **State Management**: Client-side state handling with React hooks
- 💫 **User Experience**: Client-side routing and dynamic content loading

## Tech Stack

### Core
- React 18
- Vite
- TailwindCSS

### Maps & Location
- `leaflet` - Open-source maps library
- `react-leaflet` - React components for Leaflet maps
  - Interactive maps
  - Location markers
  - Custom popups
  - Responsive map controls

### APIs Used

#### Product Data
- [Fake Store API](https://fakestoreapi.com)
  - Product listings
  - Product categories
  - Product details
  - Product search

#### Payment Processing
- [Xendit API](https://xendit.co)
  - Payment gateway integration
  - Multiple payment methods support (QRIS, GoPay, DANA, Bank Transfer)
  - Transaction status handling
  - Secure payment processing

#### Authentication
- [Fake Store Auth API](https://fakestoreapi.com/auth)
  - User authentication
  - JWT token management
  - Login/Logout functionality

### Important Libraries

#### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `@heroicons/react` - Beautiful hand-crafted SVG icons
- `react-router-dom` - Routing and navigation

#### State Management & Data Fetching
- `axios` - HTTP client for API requests
- Local state management with React hooks

#### Payment Integration
- Xendit payment gateway integration

#### User Experience
- `sweetalert2` - Beautiful, responsive alerts and modals
- Infinite scroll implementation
- Debounced search functionality

#### Development Tools
- ESLint - Code linting
- Vite - Next generation frontend tooling

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── services/      # API and service integrations
└── utils/         # Utility functions and helpers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Get from Xendit Dashboard (https://dashboard.xendit.co)
```

4. Start the development server:
```bash
npm run dev
```

### Environment Setup Guide

#### Xendit API Keys
1. Create an account at [Xendit](https://www.xendit.co)
2. Go to Settings > API Keys in your Xendit Dashboard
3. Generate new API keys (public and secret)
4. Copy the keys to your `.env` file

#### API Configuration
- The project uses [Fake Store API](https://fakestoreapi.com) for product data
- No API key is required for Fake Store API
- Make sure your `.env` file is added to `.gitignore`

## Vibe Coding Highlights

This project was built with a focus on:
- Modern UI/UX practices
- Responsive design principles
- Clean code architecture
- Performance optimization
- Real-world e-commerce features