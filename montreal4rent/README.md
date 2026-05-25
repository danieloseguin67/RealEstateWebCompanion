# Montreal4Rent - Luxury Apartment Rentals Website

Complete Angular 19 website for luxury apartment rentals in Montreal with bilingual support.

## 🏢 Project Overview

Professional real estate website for **Jessica Larmour**, specializing in luxury apartment rentals across Montreal's premium neighborhoods.

### 📧 Contact Information
- **Agent**: Jessica Larmour
- **Phone**: [438-508-1566](tel:4385081566)
- **Email**: [info@montreal4rent.com](mailto:info@montreal4rent.com)

## 🚀 Features

### ✅ Core Functionality
- **Bilingual Support**: French (default) and English with language switcher
- **Responsive Design**: Mobile-first, optimized for all devices
- **Advanced Search**: Filter by area, price, bedrooms, furnished status
- **Real-time Results**: Dynamic filtering and sorting
- **Individual Detail Pages**: Complete apartment specifications with gallery
- **Professional Navigation**: Desktop and mobile optimized with responsive menu
- **Contact Forms**: Integrated contact forms throughout the site
- **Standalone Components**: Modern Angular 19 architecture

### 🏠 Apartment Database
**4 Complete Listings** (all at 2170 Avenue Lincoln, Downtown):
- Studio apt. 1007 - Downtown ($1,199/month, furnished)
- Studio apt. 1008 - Downtown ($1,199/month, furnished)
- Studio apt. 1009 - Downtown ($1,199/month, furnished)
- Studio apt. 1010 - Downtown ($1,199/month, furnished)

**Special Promotion**: 2-3 months free rent amortized over 12-month lease
**Utilities Included**: Electricity, heating, A/C, internet

### 🗺️ Areas Configured
- **Lachine** - Riverside peaceful neighborhood
- **Pierrefonds** - Family residential with parks
- **Downtown** - Dynamic urban center (current listings)
- **Côte-des-Neiges** - Multicultural university area  
- **Plateau-Mont-Royal** - Artistic trendy district

## 🛠️ Technology Stack

- **Framework**: Angular 19 with standalone components
- **Language**: TypeScript
- **Styling**: SCSS with custom design system
- **State Management**: RxJS observables
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)

## 🎨 Design System

- **Primary Orange**: #fa742d
- **Trust Navy**: #2596be  
- **Soft Warm Gray**: #f5f5f5
- **Text Dark Gray**: #333333
- **Slate Accent**: #475569

## 🧩 Components

**Standalone Angular Components**:
- `home` - Landing page with hero, search, featured listings
- `apartments` - Full apartment listings with filters
- `apartment-detail` - Individual apartment details with gallery
- `amenities` - Building amenities showcase
- `lifestyle` - Montreal lifestyle information
- `students` - Student-focused rentals page
- `furnished-suites` - Furnished apartment listings
- `unfurnished-suites` - Unfurnished apartment listings
- `rooms-for-rent` - Shared accommodation options
- `gallery` - Photo gallery
- `contact` - Contact page with form
- `contact-form` - Reusable contact form component
- `header` - Navigation with language switcher
- `footer` - Site footer with contact info

**Services**:
- `data.service` - Apartment and area data management
- `language.service` - Bilingual content switching

## 📁 Project Structure

```
montreal4rent/
├── website/                 # Angular 19 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # All UI components
│   │   │   └── services/        # Data and language services
│   │   ├── assets/
│   │   │   └── data/            # JSON data files used by the app
│   │   │       ├── apartments.json      # Complete apartment database
│   │   │       ├── areas.json          # Montreal neighborhoods
│   │   │       └── translations.json    # Bilingual content
│   └── package.json
├── images/                  # Photography assets
├── documentation/           # Project documentation
└── proposal/                # Business documents
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 19+

### Installation
```bash
cd website
npm install
```

### Development
```bash
npm start
# Serves at http://localhost:4200
```

### Production Build
```bash
npm run build:prod
# Outputs to dist/ folder
```

## 📊 Technical Features

- ⚡ **Standalone Components**: Modern Angular 19 architecture
- 📦 **Lazy Loading**: Optimized bundle splitting  
- 📱 **Responsive Design**: Mobile-first CSS with SCSS
- 🔍 **SEO Ready**: Optimized meta tags in index.html and 404.html
- 🌐 **Font Awesome**: Icon integration
- 📧 **Email Integration**: Mailto links for contact

## 🌐 Deployment

Configured for:
- **GitHub Pages** hosting
- **Custom Domain**: montreal4rent.com
- **SSL Certificate**: Automated
- **CI/CD Pipeline**: GitHub Actions


## 📝 Content Management

All content is managed in structured JSON files located in `website/src/assets/data/`:
- **apartments.json**: Apartment specifications, images, descriptions
- **translations.json**: Complete bilingual support
- **areas.json**: Neighborhood information
- **Agent**: Contact and professional details (in code)

## 📞 Support

For technical support or content updates:
- **Developer Support**: Available during business hours
- **Content Updates**: Via JSON file modifications
- **Bug Reports**: GitHub Issues or direct contact

## � Property Details

**Building Address**: 2170 Avenue Lincoln, Montréal (Ville-Marie)
**Location Highlight**: 2-minute walk to Atwater metro station
**Building Features**:
- Private balconies with city views
- Gym facilities
- Laundry in building
- Secured access
- Modern appliances (refrigerator, stove, microwave/convection oven, cooktop, dishwasher)

---

**Status**: ✅ ACTIVE & DEPLOYED

Built with ❤️ for Montreal's luxury rental market