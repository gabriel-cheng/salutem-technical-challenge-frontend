import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../../model/ingredient';
import { IngredientFormComponent } from '../../forms/ingredient-form/ingredient-form.component';
import { IngredientApiService } from '../../../../services/api/ingredient/ingredient.service.api';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientFormComponent],
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  isFormVisible = false;
  selectedIngredient: Ingredient | null = null;

  constructor(private ingredientApiService: IngredientApiService) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredientApiService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });
  }

  showCreateForm(): void {
    this.selectedIngredient = null;
    this.isFormVisible = true;
  }

  editIngredient(ingredient: Ingredient): void {
    this.selectedIngredient = { ...ingredient };
    this.isFormVisible = true;
  }

  onFormSubmited(ingredient: Ingredient) {
    if (ingredient.ingredientId) {
      const { ingredientId, ...data } = ingredient;
      this.ingredientApiService.updateIngredient(ingredientId, data).subscribe({
        next: () => {
          this.loadIngredients();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao atualizar bebida:', err)
      });
    } else {
      this.ingredientApiService.addIngredient(ingredient).subscribe({
        next: () => {
          this.loadIngredients();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao criar cliente:', err)
      });
    }
  }


  onDeleteIngredient(ingredientId: string): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.ingredientApiService.deleteIngredient(ingredientId).subscribe({
        next: () => {
          this.ingredients = this.ingredients.filter(c => c.ingredientId !== ingredientId);
        },
        error: err => console.error('Erro ao deletar cliente:', err)
      });
    }
  }
}

