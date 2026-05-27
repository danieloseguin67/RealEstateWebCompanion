import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ListingsComponent } from './listings.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

describe('ListingsComponent', () => {
  let component: ListingsComponent;
  let fixture: ComponentFixture<ListingsComponent>;
  const apartments$ = new BehaviorSubject<any[]>([]);
  const toggles$ = new BehaviorSubject<any[]>([]);
  const areas$ = new BehaviorSubject<any[]>([]);
  const unitTypes$ = new BehaviorSubject<any[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingsComponent],
      providers: [
        {
          provide: DataService,
          useValue: {
            apartments$,
            toggles$,
            areas$,
            unitTypes$,
            loadApartments: jasmine.createSpy('loadApartments')
          }
        },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => null
          }
        },
        {
          provide: ApiService,
          useValue: {
            updateApartment: () => of(void 0),
            createApartment: () => of({}),
            deleteApartment: () => of(void 0)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the edit modal when the action button is clicked', () => {
    const rowNode = {
      data: {
        id: 'apt_001',
        feature_ids: [1],
        images: ['image.jpg']
      }
    };

    spyOn(component, 'editRow').and.callThrough();

    const actionColumn = component.colDefs[1];
    const cellContent = actionColumn.cellRenderer?.({ node: rowNode }) as HTMLElement;
    const editButton = cellContent.querySelector('.edit-btn') as HTMLButtonElement;

    editButton.click();

    expect(component.editRow).toHaveBeenCalledWith(rowNode);
    expect(component.showEditModal).toBeTrue();
    expect(component.editingApartment).toEqual({
      id: 'apt_001',
      feature_ids: [1],
      images: ['image.jpg']
    });
  });
});
