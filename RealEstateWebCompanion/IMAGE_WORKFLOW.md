# Image Management Workflow

## Overview
This application handles image uploads for apartment listings. Due to browser security restrictions, images cannot be directly written to the file system. Instead, the app uses a semi-automated workflow.

## How It Works

### 1. Uploading Images
When you browse and select images in the **Images** tab of a listing:

1. The file is read and converted to Base64 format
2. The filename is sanitized (spaces replaced with underscores, special characters removed)
3. The filename is saved to `apartments.json`
4. The image is automatically downloaded to your computer
5. The image is temporarily cached in browser sessionStorage for preview

### 2. Saving Images to Assets Folder
After uploading images:

1. Locate the downloaded images in your Downloads folder
2. Move/copy them to: `RealEstateWebCompanion/src/assets/images/`
3. The application will then load them from the assets folder

### 3. Image Display Priority
The app looks for images in this order:
1. **SessionStorage** (temporary, for recently uploaded images)
2. **Assets folder** (`/assets/images/[filename]`)

## File Naming
- Original: `My Apartment Photo 2024.jpg`
- Sanitized: `my_apartment_photo_2024.jpg`

## Benefits
✅ Only filenames stored in JSON (not base64 data)  
✅ Smaller JSON file size  
✅ Images properly organized in assets folder  
✅ Fast preview for newly uploaded images  
✅ Works with Angular build/deploy process  

## Manual Setup for Existing Images
If you have existing images:

1. Place them in `RealEstateWebCompanion/src/assets/images/`
2. Update apartment records to include the filenames in the `images` array
3. Ensure filenames match exactly (case-sensitive)

## Development Tips
- The Download button appears on each image in the modal
- Click it to re-download the image if needed
- Images in sessionStorage persist only for the current browser session
- Clear cache: Close browser or use the service's `clearImageCache()` method

## Production Deployment
When deploying:
- Ensure all images are in `src/assets/images/`
- Build the Angular app: `ng build`
- The assets folder will be included in the build output
- Deploy the entire `dist/` folder to your server

## Troubleshooting

### Image Not Found
- Verify the image exists in `assets/images/` folder
- Check filename matches exactly (including case)
- Check browser console for 404 errors

### Image Won't Upload
- Check browser console for errors
- Verify file is a valid image format (JPG, PNG, GIF, etc.)
- Try a smaller file size if browser runs out of memory

### Downloads Not Working
- Check browser's download settings
- Ensure pop-ups are not blocked
- Try using a different browser
