# Montreal4Rent Website

## Overview
Complete Angular 19 website for Montreal apartment rentals with bilingual support (French/English).

## Features
- Modern responsive design
- Advanced search and filtering
- Individual apartment detail pages
- Bilingual content (French default)
- Professional agent information
- Contact forms
- Mobile-optimized navigation

## Technology Stack
- Angular 19 with standalone components
- TypeScript
- SCSS with custom design system
- RxJS for reactive data flow
- Font Awesome icons
- Google Fonts (Inter)

## Design System
- Primary Orange: #fa742d
- Trust Navy: #2596be
- Soft Warm Gray: #f5f5f5
- Text Dark Gray: #333333
- Slate Accent: #475569

## Project Structure
```
website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── app.component.ts
│   ├── assets/
│   │   └── data/
│   │       ├── apartments.json
│   │       ├── areas.json
│   │       └── translations.json
│   ├── environments/
│   └── styles.scss
├── angular.json
├── package.json
└── tsconfig.json
```

> **Note:** The JSON files used by the application (apartments.json, areas.json, translations.json) are located in `website/src/assets/data/`. The `/data` directory at the root is not used by the website and can be ignored or removed.

## Agent Contact Information
- **Name**: Jessica Larmour
- **Phone**: 438-508-1566
- **Email**: info@montreal4rent.com
- **Specialization**: Luxury apartment rentals in Montreal

## Areas Served
- Lachine
- Pierrefonds  
- Downtown
- Côte-des-Neiges
- Plateau-Mont-Royal

## Development
1. `npm install` - Install dependencies
2. `npm start` - Run development server
3. `npm run build` - Build for production

## Deployment
Configured for GitHub Pages deployment with automated CI/CD pipeline.