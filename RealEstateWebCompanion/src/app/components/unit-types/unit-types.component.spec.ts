import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypesComponent } from './unit-types.component';

describe('UnitTypesComponent', () => {
  let component: UnitTypesComponent;
  let fixture: ComponentFixture<UnitTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
