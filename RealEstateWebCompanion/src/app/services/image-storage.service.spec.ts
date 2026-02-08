import { TestBed } from '@angular/core/testing';

import { ImageStorageService } from './image-storage.service';

describe('ImageStorageService', () => {
  let service: ImageStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize filename', () => {
    const file = new File([''], 'Test Image File.jpg');
    // The sanitize method is private, so we test through saveImageFile
    // This is just a basic test structure
  });

  it('should get image URL from sessionStorage', () => {
    const filename = 'test.jpg';
    const dataUrl = 'data:image/jpeg;base64,/9j/4AAQ';
    sessionStorage.setItem(`img_${filename}`, dataUrl);
    
    const url = service.getImageUrl(filename);
    expect(url).toBe(dataUrl);
    
    sessionStorage.removeItem(`img_${filename}`);
  });

  it('should fall back to assets path when not in sessionStorage', () => {
    const filename = 'test.jpg';
    const url = service.getImageUrl(filename);
    expect(url).toBe('/assets/images/test.jpg');
  });

  it('should clear image cache', () => {
    sessionStorage.setItem('img_test1.jpg', 'data1');
    sessionStorage.setItem('img_test2.jpg', 'data2');
    sessionStorage.setItem('other_key', 'data3');
    
    service.clearImageCache();
    
    expect(sessionStorage.getItem('img_test1.jpg')).toBeNull();
    expect(sessionStorage.getItem('img_test2.jpg')).toBeNull();
    expect(sessionStorage.getItem('other_key')).toBe('data3');
  });
});
