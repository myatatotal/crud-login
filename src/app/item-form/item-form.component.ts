import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  @Input() item: Item = {
    name: '',
    id: 0, // Definindo o ID inicial como 0
    description: '',
  };

  isEdit = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id'] !== undefined && params['id'] !== null) {
        const itemId = +params['id']; // Convertendo para número
        if (!isNaN(itemId)) {
          this.isEdit = true;
          this.itemsService.getItem(itemId).subscribe(
            (item) => {
              if (item) {
                this.item = item;
              } else {
                this.errorMessage = 'Item not found.';
              }
            },
            (error) => {
              console.error(error);
              if (error.status === 404) {
                this.errorMessage = 'Item not found.';
              } else {
                this.errorMessage =
                  'Something bad happened; please try again later.';
              }
            }
          );
        } else {
          console.error('ID is not a valid number:', params['id']);
          this.errorMessage = 'Item ID is not a valid number.';
          this.router.navigate(['/items']);
        }
      } else {
        this.isEdit = false;
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/items']);
  }

  onSubmit() {
    if (this.isEdit) {
      this.itemsService
        .updateItem(this.item.id, this.item)
        .subscribe(() => this.router.navigate(['/items']));
    } else {
      const newItem: Item = { ...this.item, id: this.generateUniqueId() };
      this.itemsService.addItem(newItem).subscribe(() => {
        this.router.navigate(['/items']);
      });
    }
  }

  generateUniqueId(): string {
    // Implemente a lógica para gerar um ID único como uma string contendo apenas números
    // Por enquanto, vamos apenas retornar um ID aleatório único como uma string
    const randomNumber = Math.floor(Math.random() * 1000);
    return randomNumber.toString();
  }
}
