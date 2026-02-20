import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SeoService } from '../../services/seo.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { SeoPage } from '../../models/data.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seo-manager',
  standalone: true,
  imports: [AgGridAngular, CommonModule, FormsModule],
  templateUrl: './seo-manager.component.html',
  styleUrl: './seo-manager.component.scss'
})
export class SeoManagerComponent implements OnInit {
  rowData: SeoPage[] = [];
  private gridApi: any;
  websiteUrl: string | null = null;
  isEditing: boolean = false;
  editingPage: SeoPage | null = null;
  originalPage: SeoPage | null = null;
  changeFrequencyOptions = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  showHelp: boolean = false;
  
  colDefs: ColDef[] = [
    { 
      headerName: 'Actions', 
      width: 180, 
      cellRenderer: (params: any) => {
        return '<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>';
      },
      editable: false,
      filter: false,
      sortable: false
    },
    { field: 'pageName', headerName: 'Page Name', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'pageUrl', headerName: 'Page URL', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'title', headerName: 'Page Title', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'metaName', headerName: 'Meta Name', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'metaDescription', headerName: 'Meta Description', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { 
      field: 'changeFrequency', 
      headerName: 'Change Frequency', 
      width: 150, 
      filter: true, 
      sortable: true, 
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
      }
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120, 
      filter: 'agNumberColumnFilter', 
      sortable: true, 
      editable: true,
      valueFormatter: (params: any) => params.value !== undefined ? params.value.toFixed(1) : ''
    }
  ];
  
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };
  
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'autoHeight'
  };

  constructor(
    private seoService: SeoService,
    private googleDriveService: GoogleDriveService
  ) {}

  ngOnInit(): void {
    this.seoService.seoPages$.subscribe(data => {
      this.rowData = data;
    });
    this.websiteUrl = this.seoService.getWebsiteUrl();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteRow(event.node);
      } else if (event.event.target.classList.contains('edit-btn')) {
        this.editRow(event.node);
      }
    });
  }

  onCellValueChanged(event: any): void {
    // Update lastModified timestamp
    const updatedRow = event.data;
    updatedRow.lastModified = new Date().toISOString().split('T')[0];
    this.saveData();
  }

  addRow(): void {
    const newRow: SeoPage = {
      id: this.generateId(),
      pageName: '',
      pageUrl: '/',
      title: '',
      metaName: '',
      metaDescription: '',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.5
    };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
  }

  editRow(node: any): void {
    this.editingPage = { ...node.data };
    this.originalPage = { ...node.data };
    this.isEditing = true;
  }

  saveEdit(): void {
    if (this.editingPage) {
      // Update lastModified timestamp
      this.editingPage.lastModified = new Date().toISOString().split('T')[0];
      
      const index = this.rowData.findIndex(row => row.id === this.editingPage!.id);
      if (index !== -1) {
        this.rowData[index] = { ...this.editingPage };
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.saveData();
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingPage = null;
    this.originalPage = null;
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
  }

  closeHelp(): void {
    this.showHelp = false;
  }

  deleteRow(node: any): void {
    if (confirm('Are you sure you want to delete this SEO page?')) {
      this.rowData = this.rowData.filter(row => row.id !== node.data.id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
    }
  }

  saveData(): void {
    this.seoService.updateSeoPages(this.rowData);
  }

  exportData(): void {
    this.googleDriveService.exportData({ seoPages: this.rowData });
  }

  clearAllRecords(): void {
    if (this.rowData.length === 0) {
      alert('No records to clear.');
      return;
    }
    
    if (confirm(`Are you sure you want to delete all ${this.rowData.length} SEO record(s)?\n\nThis action cannot be undone.`)) {
      this.rowData = [];
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
      alert('All SEO records have been cleared.');
    }
  }

  async importData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        if (data.seoPages) {
          this.rowData = data.seoPages;
          this.gridApi?.setGridOption('rowData', this.rowData);
          this.saveData();
        }
      } catch (error) {
        alert('Invalid JSON file');
      }
    }
  }

  generateSitemap(): void {
    this.seoService.downloadSitemap();
  }

  changeWebsiteUrl(): void {
    const currentUrl = this.seoService.getWebsiteUrl();
    const defaultUrl = currentUrl || 'https://www.yourwebsite.com';
    const newUrl = prompt('Enter your website URL:', defaultUrl);
    
    if (newUrl && newUrl.trim()) {
      const cleanUrl = newUrl.trim().replace(/\/$/, '');
      this.seoService.setWebsiteUrl(cleanUrl);
      this.websiteUrl = cleanUrl;
      alert(`Website URL updated to: ${cleanUrl}`);
    }
  }

  manualImportUrls(): void {
    const baseUrl = this.seoService.getWebsiteUrl();
    
    if (!baseUrl) {
      const newUrl = prompt('First, enter your website URL (e.g., https://montreal4rent.com):', 'https://www.yourwebsite.com');
      if (newUrl && newUrl.trim()) {
        const cleanUrl = newUrl.trim().replace(/\/$/, '');
        this.seoService.setWebsiteUrl(cleanUrl);
        this.websiteUrl = cleanUrl;
      } else {
        return;
      }
    }

    const urlsText = prompt(
      'Paste your website\'s page URLs (one per line):\n\nFor Montreal4Rent, use:\n/\n/apartments\n/fully-furnished\n/condo-rentals\n/rooms-for-rent\n/property-owners\n/contact-us',
      '/\n/apartments\n/fully-furnished\n/condo-rentals\n/rooms-for-rent\n/property-owners\n/contact-us'
    );
    
    if (!urlsText) {
      return;
    }

    const lines = urlsText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const newPages: SeoPage[] = [];
    const today = new Date().toISOString().split('T')[0];
    const currentBaseUrl = this.seoService.getWebsiteUrl();
    if (!currentBaseUrl) {
      alert('Website URL is not set. Please try again.');
      return;
    }
    const urlObj = new URL(currentBaseUrl);
    const siteName = this.extractDomainName(urlObj.hostname);

    for (const line of lines) {
      let path: string;
      
      try {
        if (line.startsWith('http')) {
          const fullUrl = new URL(line);
          path = fullUrl.pathname;
        } else if (line.startsWith('/')) {
          path = line;
        } else {
          path = '/' + line;
        }
        
        const pageName = this.extractPageNameFromPath(path);
        const recommendations = this.getPageRecommendations(path, pageName, siteName);
        
        newPages.push({
          id: this.generateId(),
          pageName: recommendations.pageName,
          pageUrl: path,
          title: recommendations.title,
          metaName: 'description',
          metaDescription: recommendations.metaDescription,
          lastModified: today,
          changeFrequency: recommendations.changeFrequency,
          priority: recommendations.priority
        });
      } catch (error) {
        console.log(`Skipping invalid URL: ${line}`);
      }
    }

    if (newPages.length === 0) {
      alert('No valid URLs found to import.');
      return;
    }

    // Filter out duplicate paths
    const existingPaths = new Set(this.rowData.map(p => p.pageUrl));
    const uniqueNewPages = newPages.filter(p => !existingPaths.has(p.pageUrl));
    
    if (uniqueNewPages.length === 0) {
      alert('All entered URLs already have SEO records.');
      return;
    }

    this.rowData = [...uniqueNewPages, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
    
    alert(`Successfully imported ${uniqueNewPages.length} URL(s) with recommended SEO values.`);
  }

  async preloadPages(): Promise<void> {
    const currentUrl = this.seoService.getWebsiteUrl();
    const defaultUrl = currentUrl || 'https://www.yourwebsite.com';
    const baseUrl = prompt(`Enter your website URL to inspect (e.g., https://www.yourwebsite.com):`, defaultUrl);
    
    if (!baseUrl) {
      return;
    }

    // Clean up the URL
    const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
    
    // Store the website URL
    this.seoService.setWebsiteUrl(cleanBaseUrl);
    this.websiteUrl = cleanBaseUrl;

    // Try to discover pages from the website
    const discoveredPages = await this.discoverWebsitePages(cleanBaseUrl);
    
    if (discoveredPages.length === 0) {
      const retry = confirm('Could not discover pages automatically due to CORS restrictions.\n\nWould you like to manually enter your page URLs instead?\n\nClick OK to use Manual Import, or Cancel to exit.');
      if (retry) {
        this.manualImportUrls();
      }
      return;
    }

    // Confirm action
    const existingCount = this.rowData.length;
    const message = existingCount > 0 
      ? `Found ${discoveredPages.length} page(s) on the website. You have ${existingCount} existing record(s). Continue?`
      : `Found ${discoveredPages.length} page(s) on the website. Add them with recommended SEO values?`;
    
    if (!confirm(message)) {
      return;
    }
    
    // Filter out duplicate paths
    const existingPaths = new Set(this.rowData.map(p => p.pageUrl));
    const uniqueNewPages = discoveredPages.filter(p => !existingPaths.has(p.pageUrl));
    
    if (uniqueNewPages.length === 0) {
      alert('All discovered pages already have SEO records.');
      return;
    }

    // Add new pages to the beginning of the list
    this.rowData = [...uniqueNewPages, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
    
    alert(`Successfully added ${uniqueNewPages.length} SEO record(s) from the website.`);
  }

  private async discoverWebsitePages(baseUrl: string): Promise<SeoPage[]> {
    const pages: SeoPage[] = [];
    const today = new Date().toISOString().split('T')[0];

    try {
      // First, try to fetch and parse the sitemap.xml
      const sitemapUrl = `${baseUrl}/sitemap.xml`;
      const sitemapPages = await this.fetchSitemap(sitemapUrl);
      
      if (sitemapPages.length > 0) {
        return sitemapPages;
      }
    } catch (error) {
      console.log('Could not fetch sitemap, trying homepage...');
    }

    try {
      // If sitemap fails, try to fetch and parse the homepage
      const homepagePages = await this.fetchHomepage(baseUrl);
      
      if (homepagePages.length > 0) {
        return homepagePages;
      }
    } catch (error) {
      console.log('Could not fetch homepage:', error);
    }

    // If both methods fail due to CORS, provide fallback with common pages
    return this.generateFallbackPages(baseUrl);
  }

  private async fetchSitemap(sitemapUrl: string): Promise<SeoPage[]> {
    const pages: SeoPage[] = [];
    const today = new Date().toISOString().split('T')[0];

    try {
      const response = await fetch(sitemapUrl, { mode: 'cors' });
      
      if (!response.ok) {
        throw new Error('Sitemap not found');
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const urls = xmlDoc.getElementsByTagName('url');
      
      for (let i = 0; i < urls.length; i++) {
        const locElement = urls[i].getElementsByTagName('loc')[0];
        const lastmodElement = urls[i].getElementsByTagName('lastmod')[0];
        const changefreqElement = urls[i].getElementsByTagName('changefreq')[0];
        const priorityElement = urls[i].getElementsByTagName('priority')[0];
        
        if (locElement) {
          const fullUrl = locElement.textContent || '';
          const urlObj = new URL(fullUrl);
          const path = urlObj.pathname;
          const pageName = this.extractPageNameFromPath(path);
          
          pages.push({
            id: this.generateId(),
            pageName: pageName,
            pageUrl: path,
            title: `${pageName} - ${this.extractDomainName(urlObj.hostname)}`,
            metaName: 'description',
            metaDescription: `Visit our ${pageName.toLowerCase()} page for more information.`,
            lastModified: lastmodElement?.textContent || today,
            changeFrequency: (changefreqElement?.textContent as any) || 'monthly',
            priority: parseFloat(priorityElement?.textContent || '0.5')
          });
        }
      }
    } catch (error) {
      console.log('Error fetching sitemap:', error);
      throw error;
    }

    return pages;
  }

  private async fetchHomepage(baseUrl: string): Promise<SeoPage[]> {
    const pages: SeoPage[] = [];
    const today = new Date().toISOString().split('T')[0];
    const discoveredUrls = new Set<string>();

    try {
      const response = await fetch(baseUrl, { mode: 'cors' });
      
      if (!response.ok) {
        throw new Error('Could not fetch homepage');
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract links from the page
      const links = doc.querySelectorAll('a[href]');
      const urlObj = new URL(baseUrl);
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          try {
            let fullUrl: URL;
            
            if (href.startsWith('http')) {
              fullUrl = new URL(href);
            } else if (href.startsWith('/')) {
              fullUrl = new URL(href, baseUrl);
            } else {
              return; // Skip relative URLs without /
            }
            
            // Only include URLs from the same domain
            if (fullUrl.hostname === urlObj.hostname) {
              const path = fullUrl.pathname;
              // Skip common non-page URLs
              if (!path.match(/\.(jpg|jpeg|png|gif|css|js|pdf|zip)$/i) && !discoveredUrls.has(path)) {
                discoveredUrls.add(path);
                
                const pageName = this.extractPageNameFromPath(path);
                const linkText = link.textContent?.trim() || pageName;
                
                pages.push({
                  id: this.generateId(),
                  pageName: linkText.substring(0, 50),
                  pageUrl: path,
                  title: `${linkText} - ${this.extractDomainName(urlObj.hostname)}`,
                  metaName: 'description',
                  metaDescription: `Visit our ${linkText.toLowerCase()} page for more information.`,
                  lastModified: today,
                  changeFrequency: 'monthly',
                  priority: path === '/' ? 1.0 : 0.5
                });
              }
            }
          } catch (e) {
            // Skip invalid URLs
          }
        }
      });
    } catch (error) {
      console.log('Error fetching homepage:', error);
      throw error;
    }

    return pages;
  }

  private generateFallbackPages(baseUrl: string): SeoPage[] {
    // Don't generate fallback pages - let user know CORS blocked it
    // Return empty array to trigger the manual import prompt
    return [];
    
    /* Old fallback code removed - CORS typically blocks this
    const pages: SeoPage[] = [];
    const today = new Date().toISOString().split('T')[0];
    const urlObj = new URL(baseUrl);
    const siteName = this.extractDomainName(urlObj.hostname);
    
    const commonPages = [
      { path: '/', name: 'Home', priority: 1.0, freq: 'daily' },
      { path: '/about', name: 'About Us', priority: 0.8, freq: 'monthly' },
      { path: '/contact', name: 'Contact', priority: 0.7, freq: 'monthly' },
      { path: '/services', name: 'Services', priority: 0.9, freq: 'weekly' },
      { path: '/blog', name: 'Blog', priority: 0.8, freq: 'daily' }
    ];

    for (const page of commonPages) {
      pages.push({
        id: this.generateId(),
        pageName: page.name,
        pageUrl: page.path,
        title: `${page.name} - ${siteName}`,
        metaName: 'description',
        metaDescription: `Visit our ${page.name.toLowerCase()} page for more information.`,
        lastModified: today,
        changeFrequency: page.freq as any,
        priority: page.priority
      });
    }

    return pages;
    */
  }

  private extractPageNameFromPath(path: string): string {
    if (path === '/' || path === '') {
      return 'Home';
    }
    
    const parts = path.split('/').filter(p => p.length > 0);
    if (parts.length === 0) {
      return 'Home';
    }
    
    const lastPart = parts[parts.length - 1];
    // Remove file extensions and convert to title case
    return lastPart
      .replace(/\.[^.]*$/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private extractDomainName(hostname: string): string {
    // Remove www. and extract domain name
    const parts = hostname.replace('www.', '').split('.');
    if (parts.length > 0) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return hostname;
  }

  private getPageRecommendations(path: string, pageName: string, siteName: string): {
    pageName: string;
    title: string;
    metaDescription: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  } {
    // Real estate specific recommendations
    const recommendations: { [key: string]: any } = {
      '/': {
        pageName: 'Home',
        title: `${siteName} - Find Your Perfect Rental in Montreal`,
        metaDescription: `Browse Montreal's best rental properties. Find apartments, furnished rentals, condos and rooms for rent. Trusted by renters since 2004.`,
        changeFrequency: 'daily',
        priority: 1.0
      },
      '/apartments': {
        pageName: 'Apartments',
        title: `Apartments for Rent in Montreal | ${siteName}`,
        metaDescription: `Find quality apartments for rent in Montreal. Browse our extensive listings of 1, 2, and 3 bedroom apartments in all Montreal neighborhoods.`,
        changeFrequency: 'daily',
        priority: 0.9
      },
      '/fully-furnished': {
        pageName: 'Fully Furnished',
        title: `Fully Furnished Apartments Montreal | ${siteName}`,
        metaDescription: `Discover fully furnished apartments in Montreal. Move-in ready rentals perfect for students, professionals, and temporary stays.`,
        changeFrequency: 'daily',
        priority: 0.9
      },
      '/condo-rentals': {
        pageName: 'Condo Rentals',
        title: `Condo Rentals in Montreal | ${siteName}`,
        metaDescription: `Luxury condo rentals in Montreal. Browse premium condominiums with modern amenities in desirable locations.`,
        changeFrequency: 'daily',
        priority: 0.9
      },
      '/rooms-for-rent': {
        pageName: 'Rooms for Rent',
        title: `Rooms for Rent in Montreal | ${siteName}`,
        metaDescription: `Affordable rooms for rent in Montreal. Perfect for students and young professionals. Find your ideal shared accommodation.`,
        changeFrequency: 'daily',
        priority: 0.8
      },
      '/property-owners': {
        pageName: 'Property Owners',
        title: `List Your Property | ${siteName}`,
        metaDescription: `Property owners: List your Montreal rental properties with us. Reach thousands of qualified renters searching for their next home.`,
        changeFrequency: 'monthly',
        priority: 0.7
      },
      '/contact-us': {
        pageName: 'Contact Us',
        title: `Contact Us | ${siteName}`,
        metaDescription: `Get in touch with ${siteName}. We're here to help you find the perfect rental or list your property in Montreal.`,
        changeFrequency: 'monthly',
        priority: 0.6
      },
      '/about': {
        pageName: 'About Us',
        title: `About Us | ${siteName}`,
        metaDescription: `Learn about ${siteName}, Montreal's trusted rental platform connecting renters with quality properties since 2004.`,
        changeFrequency: 'monthly',
        priority: 0.5
      }
    };

    // Check if we have specific recommendations
    const lowerPath = path.toLowerCase();
    if (recommendations[lowerPath]) {
      return recommendations[lowerPath];
    }

    // Default recommendations
    return {
      pageName: pageName,
      title: `${pageName} | ${siteName}`,
      metaDescription: `Explore ${pageName.toLowerCase()} on ${siteName}. Find quality rental properties in Montreal.`,
      changeFrequency: 'monthly',
      priority: 0.5
    };
  }



  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
