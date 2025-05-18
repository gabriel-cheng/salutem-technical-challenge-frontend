import { Component, OnInit } from '@angular/core';
import { Drink } from '../../../../model/drink';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';
import { DrinkFormComponent } from '../../forms/drink-form/drink-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  imports: [DrinkFormComponent, CommonModule],
  standalone: true
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  isFormVisible = false;
  selectedDrink?: Drink | null = null;

  constructor(private drinkService: DrinkApiService) {}

  ngOnInit(): void {
    this.loadDrinks();
  }

  loadDrinks(): void {
    this.drinkService.getAll().subscribe(drinks => this.drinks = drinks);
  }

  showCreateForm(): void {
    this.selectedDrink = null;
    this.isFormVisible = true;
  }

  onEditDrink(drink: Drink): void {
    this.selectedDrink = { ...drink };
    this.isFormVisible = true;
  }

  onDeleteDrink(id: string): void {
    this.drinkService.deleteDrink(id).subscribe(() => this.loadDrinks());
  }

  onFormSubmited(drink: Drink): void {
    if (drink.drinkId) {
      const { drinkId, ...data } = drink;
      this.drinkService.updateDrink(drinkId, data).subscribe(() => {
        this.loadDrinks();
        this.isFormVisible = false;
      });
    } else {
      this.drinkService.addDrink(drink).subscribe(() => {
        this.loadDrinks();
        this.isFormVisible = false;
      });
    }
  }
}
