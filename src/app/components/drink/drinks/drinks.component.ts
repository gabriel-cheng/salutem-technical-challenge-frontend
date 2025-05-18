import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drink } from '../../../../model/drink';
import { DrinkFormComponent } from '../../forms/drink-form/drink-form.component';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [CommonModule, DrinkFormComponent],
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  isFormVisible = false;
  selectedDrink: Drink | null = null;

  constructor(private drinkApiService: DrinkApiService) {}

  ngOnInit(): void {
    this.loadDrinks();
  }

  loadDrinks(): void {
    this.drinkApiService.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  showCreateForm(): void {
    this.selectedDrink = null;
    this.isFormVisible = true;
  }

  editDrink(drink: Drink): void {
    this.selectedDrink = { ...drink };
    this.isFormVisible = true;
  }

  onFormSubmited(drink: Drink) {
    if (drink.drinkId) {
      const { drinkId, ...data } = drink;
      this.drinkApiService.updateDrink(drinkId, data).subscribe({
        next: () => {
          this.loadDrinks();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao atualizar bebida:', err)
      });
    } else {
      this.drinkApiService.addDrink(drink).subscribe({
        next: () => {
          this.loadDrinks();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao criar cliente:', err)
      });
    }
  }


  onDeleteDrink(drinkId: string): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.drinkApiService.deleteDrink(drinkId).subscribe({
        next: () => {
          this.drinks = this.drinks.filter(c => c.drinkId !== drinkId);
        },
        error: err => console.error('Erro ao deletar cliente:', err)
      });
    }
  }
}

