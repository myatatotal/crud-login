import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListComponent } from './items-list.component';
import { of } from 'rxjs';
import { ItemsService } from '../items.service';
// other imports...

beforeEach(async () => {
  await TestBed.configureTestingModule({
    // other configurations...
    providers: [
      {
        provide: ItemsService,
        useValue: {
          getItems: () => of([]), // add this line
          // other methods...
        },
      },
      // other providers...
    ],
  }).compileComponents();
});
describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
