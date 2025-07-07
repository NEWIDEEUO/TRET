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
- June 25, 2025. Added color and size selection within order form (colors: Light Brown, Dark Brown, Black; sizes: 40-44)
- June 25, 2025. Added comprehensive delivery system with Algerian provinces pricing, home/office delivery options, and automatic total price calculation
- June 25, 2025. CRITICAL FIX: Completely rewrote JavaScript functionality to fix all selection issues (color/size/delivery/summary), added console logging for debugging, fixed CSS conflicts with !important rules
- June 25, 2025. COMPLETE SYSTEM RESET: Removed all existing wilaya/delivery systems as requested by user. Ready for new implementation with user's exact specifications and pricing data.
- June 25, 2025. IMPLEMENTED NEW DELIVERY SYSTEM: Added complete wilaya list with exact pricing from user data. Home/office delivery options with proper availability handling. 3 unavailable provinces (ILLIZI, BORDJ BADJI MOKHTAR, DJANET). Some provinces have home-only delivery (TINDOUF, IN SALAH, IN GUEZZAM, MGHAIR, EL MENIA).
- June 25, 2025. MAJOR UI/UX IMPROVEMENTS: Enhanced delivery selection interface with compact design, improved form validation with real-time feedback, enhanced success/error modals with animations, implemented 10-second anti-spam protection with countdown timer, added loading states and visual feedback for better user experience.
- June 25, 2025. COMPLETE VALIDATION SYSTEM: Added comprehensive validation for all fields including color and size selection. Compact delivery selection interface with smaller, elegant boxes. Success modal now requires manual close (no auto-close). Updated anti-spam to 30 seconds with proper error message. All interconnections tested and working properly.
- June 25, 2025. COMPLETE MODAL REDESIGN: Completely redesigned all popup windows from scratch with compact, professional design. Mobile-optimized modals with appropriate sizing (60% width, max 200px). Simplified messages for better UX. Clean close button with hover effects. Perfect for mobile devices.
- June 25, 2025. MODAL POSITIONING & DELIVERY UX: Fixed modal positioning to true center of screen on all devices. Enhanced delivery selection with visual feedback - gradient backgrounds, shadow effects, and pulse animation on selection. Improved user experience with clear visual confirmation of choices.
- June 25, 2025. MODAL CENTERING FIX: Corrected conflicting CSS rules in mobile responsive section that were overriding the perfect center positioning. Removed margin-based positioning in favor of fixed positioning with transform centering.
- June 25, 2025. FACEBOOK PIXEL INTEGRATION: Added complete Facebook Pixel tracking system. Base code in HTML head for PageView tracking. Purchase event tracking only on successful order completion with full order value (product + delivery) in DZD currency. Anti-spam protection prevents duplicate tracking during 30-second cooldown period.
- June 25, 2025. PRODUCT IMAGES UPDATE: Replaced all 4 product images with new sandal images. Updated main image and thumbnail gallery to show brown and black leather sandals with detailed product views including sole design.
- June 25, 2025. TELEGRAM COLOR TRANSLATION: Added French color translation for Telegram messages. Color names now appear in French (Marron Clair, Marron Foncé, Noir) while keeping rest of message content in Arabic.
- June 25, 2025. ASSETS CLEANUP: Cleaned attached_assets folder from 39 files to 4 essential product images. Removed all unused images, temporary text files, and PNG files. Kept only the 4 current product images in use by the landing page.
- July 07, 2025. COMPLETE PRODUCT CHANGE: Changed entire product from men's sandals to magnetic towel. Updated product name, description, and features. Removed size selection system completely. Updated color options to Pink, Light Blue, and White. Updated pricing to 4500/5000 DZD with 10% discount. Changed delivery display to show "free" while preserving real costs in Telegram messages.
- July 07, 2025. DUAL PRICING SYSTEM: Implemented dual pricing system where customers see fixed price of 4500 DZD (including free delivery) while internal calculations use real costs (2500 DZD per product + actual delivery costs). Added profit calculation section to Telegram messages showing customer payment vs real costs and net profit.
- July 07, 2025. MULTI-ITEM PRICING SYSTEM: Implemented different pricing logic for multiple items. Single item: fixed 4500 DZD. Multiple items: (2500 + 1000) × quantity + actual delivery cost. Updated order summary and Telegram calculations to handle both scenarios correctly.
- July 07, 2025. DISCOUNT NOTIFICATION UI: Added visual discount notification in order summary that appears when customers order 2+ items. Shows savings comparison between regular price (4500 × quantity) and discounted price. Green gradient styling with icon integration. Hidden for single item orders.
- July 07, 2025. FACEBOOK PIXEL OPTIMIZATION: Fixed Facebook Pixel Purchase event to track actual customer payment amounts instead of internal costs. Updated tracking logic to match new pricing system: single item (4500 DZD) vs multiple items ((2500+1000)×quantity+delivery). Ensures pixel data matches customer payments and Telegram messages.
- July 07, 2025. FACEBOOK PIXEL ID UPDATE: Changed Facebook Pixel ID from 2495737634127216 to 1659197954765777 in all files. Updated both the init function and noscript fallback in index.html to use the new pixel ID for proper tracking.
- July 07, 2025. PRODUCT IMAGES UPDATE: Updated all 4 product images to new magnetic towel images showing actual usage scenarios (beach scenes, hands demonstrating magnetic closure mechanism, and different color variants).

## User Preferences

Preferred communication style: Simple, everyday language.