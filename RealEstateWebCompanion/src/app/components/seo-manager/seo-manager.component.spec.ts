import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoManagerComponent } from './seo-manager.component';

describe('SeoManagerComponent', () => {
  let component: SeoManagerComponent;
  let fixture: ComponentFixture<SeoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
