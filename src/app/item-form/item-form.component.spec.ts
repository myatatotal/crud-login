import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ItemsService } from '../items.service';
import { ItemFormComponent } from './item-form.component';
import { FormsModule } from '@angular/forms';
// other imports...

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [FormsModule], // add this line
    declarations: [ ItemFormComponent ],
    providers: [
      { provide: ItemsService, useValue: { getItem: () => of({}), updateItem: () => of({}), addItem: () => of({}) } },
      { provide: Router, useValue: { navigate: () => {} } },
      { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
    ]
  })
  .compileComponents();
});

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  let itemsService: ItemsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormComponent ],
      providers: [
        { provide: ItemsService, useValue: { getItem: () => of({}), updateItem: () => of({}), addItem: () => of({}) } },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    itemsService = TestBed.inject(ItemsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('generateUniqueId should return a string', () => {
    const id = component.generateUniqueId();
    expect(typeof id).toBe('string');
  });
});