# Arabic Landing Page - Product Order System

## Overview

This is a responsive Arabic landing page template for product sales with integrated Telegram bot notifications. The system is designed as a reusable template for multiple products, featuring a clean RTL (right-to-left) layout, order form processing, and dual-channel Telegram integration for order management.

## System Architecture

### Frontend Architecture
- **Static HTML Structure**: Single-page application using semantic HTML5 with RTL support
- **CSS Styling**: Custom CSS with Cairo font family, responsive grid layout, and mobile-first design
- **JavaScript Functionality**: Vanilla JavaScript for form handling, image gallery interactions, and API communications
- **No Framework Dependencies**: Pure web technologies for maximum compatibility and fast loading

### Backend Architecture
- **Static File Server**: Python's built-in HTTP server for development and simple deployment
- **Client-Side Processing**: All form validation and data processing handled in the browser
- **External API Integration**: Direct communication with Telegram Bot API for order notifications

## Key Components

### 1. Image Gallery System
- **Main Image Display**: Large product showcase with dynamic image switching
- **Thumbnail Navigation**: Horizontal scrollable thumbnail gallery
- **Image Switching Logic**: JavaScript-powered instant image updates without page reload

### 2. Product Information Display
- **Dynamic Pricing**: Configurable base price, discount percentage, and currency
- **Multilingual Support**: Full Arabic language support with proper RTL text direction
- **Product Configuration**: Centralized product data management in JavaScript

### 3. Order Form Management
- **Form Fields**: Name, phone, wilaya (state), commune, and quantity inputs
- **Validation System**: Client-side form validation with real-time feedback
- **Algerian Geographic Data**: Pre-populated dropdown with all 58 Algerian wilayas

### 4. Telegram Integration
- **Dual Channel System**: 
  - Channel 1: Short notification alerts
  - Channel 2: Detailed order information
- **Anti-Spam Protection**: Cooldown mechanism to prevent order flooding
- **Error Handling**: Comprehensive error management for API failures

## Data Flow

1. **User Interaction**: Customer browses product images and fills order form
2. **Form Validation**: JavaScript validates all required fields before submission
3. **Order Processing**: Form data is collected and formatted for transmission
4. **Telegram Notification**: Dual messages sent to configured Telegram channels
5. **User Feedback**: Success/error messages displayed to customer

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: Icons and visual elements
- **Google Fonts Cairo**: Arabic typography support
- **Telegram Bot API**: Order notification delivery

### Development Dependencies
- **Python 3.11**: Static file server
- **Node.js 20**: Development environment support

## Deployment Strategy

### Development Environment
- **Python HTTP Server**: Simple static file serving on port 5000
- **Hot Reload**: Manual refresh required for changes
- **Local Testing**: Full functionality available locally

### Production Deployment
- **Static Hosting Compatible**: Can be deployed to any static hosting service
- **CDN Integration**: External resources loaded from CDNs for performance
- **Environment Configuration**: Telegram bot tokens and channel IDs configurable

### Configuration Management
- **Product Settings**: Centralized in `PRODUCT_CONFIG` object
- **Telegram Settings**: Bot token and channel IDs in `TELEGRAM_CONFIG`
- **Anti-Spam Settings**: Cooldown timers in `SPAM_PROTECTION` object

## Changelog
- June 25, 2025. Initial setup
- June 25, 2025. Updated product from alarm clock to men's sandals with new content and pricing (2500/2800 DA)

## User Preferences

Preferred communication style: Simple, everyday language.