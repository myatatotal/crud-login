import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  // @Input() items: Item | null | undefined;
  items: Item[] = [];
  isLoading = false;
  error: string = '';
  selectedItem: Item | undefined;

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.isLoading = true;
    this.error = '';
    this.itemsService.getItems().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  openEditForm(id: number) {
    this.router.navigate(['/items', id, 'edit']);
  }

  openNewForm() {
    this.router.navigate(['/items/new']);
    this.selectedItem = undefined; // Clear selected item for new form
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemsService.deleteItem(id).subscribe(
        () => {
          this.getItems(); // Refresh item list after deletion
        },
        (error) => {
          this.error = error.message; // Handle delete error
        }
      );
    }
  }
}
