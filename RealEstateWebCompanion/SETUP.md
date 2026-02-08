# Real Estate Web Companion - Setup Instructions

## Quick Start

Your Angular 19 Real Estate Web Companion application has been created!

### Navigate to the project

```bash
cd RealEstateWebCompanion
```

### Start the development server

```bash
ng serve
```

Then open your browser to `http://localhost:4200/`

## Project Structure

```
RealEstateWebCompanion/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/       # Dashboard with statistics
│   │   │   ├── listings/        # Listings grid with AG-Grid
│   │   │   ├── areas/           # Areas management
│   │   │   ├── unit-types/      # Unit types grid
│   │   │   └── toggles/         # Features toggles
│   │   ├── models/
│   │   │   └── data.models.ts   # TypeScript interfaces
│   │   ├── services/
│   │   │   ├── data.service.ts       # Data management
│   │   │   ├── storage.service.ts    # Local storage
│   │   │   └── google-drive.service.ts  # Google Drive integration
│   │   └── app.routes.ts
│   └── assets/
│       └── data/
│           ├── apartments.json  # Sample listings
│           ├── areas.json       # Sample areas
│           ├── unitTypes.json   # Sample unit types
│           └── toggles.json     # Sample features
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
└── README.md
```

## Features

### 1. Dashboard
- View statistics (total listings, available listings, areas, average price)
- Export all data to JSON
- Import data from JSON file
- Preview of recent listings

### 2. Listings Management
- Sortable and filterable grid powered by AG-Grid
- View all apartment listings
- Filter by any column
- Pagination support

### 3. Areas Management
- Manage different areas/neighborhoods
- Track average rent and popularity
- Sortable and filterable

### 4. Unit Types
- Manage different unit types (Studio, 1BR, 2BR, etc.)
- Track size ranges and average prices

### 5. Features/Toggles
- Enable/disable property features
- Track available amenities

## Data Storage

- **Local Storage**: All data modifications are automatically saved in the browser's local storage
- **JSON Export/Import**: Export your entire dataset to JSON for backup or sharing
- **Sample Data**: Pre-loaded with sample data on first run

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
   ```bash
   ng build --base-href /RealEstateWebCompanion/
   ```

2. Install angular-cli-ghpages:
   ```bash
   npm install -g angular-cli-ghpages
   ```

3. Deploy:
   ```bash
   npx angular-cli-ghpages --dir=dist/real-estate-web-companion/browser
   ```

### Option 2: Automatic Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. Initialize Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a repository on GitHub named "RealEstateWebCompanion"

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/RealEstateWebCompanion.git
   git branch -M main
   git push -u origin main
   ```

4. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select "gh-pages" branch as the source
   - Your app will be available at: `https://YOUR_USERNAME.github.io/RealEstateWebCompanion/`

## Google Drive Integration (Optional)

To enable Google Drive export/import:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Drive API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized JavaScript origins:
   - `http://localhost:4200` (for development)
   - `https://YOUR_USERNAME.github.io` (for production)
6. Add authorized redirect URIs
7. Copy your Client ID and API Key
8. Update `src/app/services/google-drive.service.ts`:
   ```typescript
   private CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
   private API_KEY = 'YOUR_API_KEY';
   ```

## Customization

### Adding More Data

Edit the JSON files in `src/assets/data/` to add your own data:
- `apartments.json` - Your property listings
- `areas.json` - Your service areas
- `unitTypes.json` - Property types you handle
- `toggles.json` - Available features/amenities

### Styling

- Global styles: `src/styles.scss`
- Component styles: Each component has its own `.scss` file
- AG-Grid theme: Alpine theme (can be changed in styles.scss)

### Grid Customization

Modify column definitions in each component's TypeScript file to customize:
- Column visibility
- Sorting options
- Filtering options
- Cell renderers
- Value formatters

## Technologies

- **Angular 19**: Latest version with standalone components
- **AG-Grid**: Enterprise-grade data grid
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling
- **RxJS**: Reactive programming
- **Local Storage API**: Browser-based data persistence
- **Google Drive API**: Cloud storage integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### Run tests
```bash
ng test
```

### Build for production
```bash
ng build --configuration production
```

### Generate new components
```bash
ng generate component components/my-component
```

### Generate new services
```bash
ng generate service services/my-service
```

## Troubleshooting

### Application not loading data
- Check browser console for errors
- Verify JSON files are in `src/assets/data/`
- Clear browser local storage and reload

### AG-Grid not displaying
- Ensure AG-Grid styles are imported in `styles.scss`
- Check that `ag-theme-alpine` class is applied to the grid

### GitHub Pages 404 error
- Ensure base href is set correctly in build command
- Check that repository name matches the base href
- Verify gh-pages branch was created

## Support

For issues or questions:
1. Check the Angular documentation: https://angular.dev
2. Check AG-Grid documentation: https://www.ag-grid.com/
3. Review the code comments in the source files

## License

MIT License - Feel free to use this project for your real estate business!
