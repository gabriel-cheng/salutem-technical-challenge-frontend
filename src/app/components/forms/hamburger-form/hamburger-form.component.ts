import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hamburger } from '../../../../model/hamburger';
import { Ingredient } from '../../../../model/ingredient';
import { IngredientApiService } from '../../../../services/api/ingredient/ingredient.service.api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hamburger-form',
  standalone: true,
  templateUrl: './hamburger-form.component.html',
  styleUrls: ['./hamburger-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class HamburgerFormComponent implements OnInit {
  @Input() hamburger: Hamburger | null = null;
  @Output() formSubmit = new EventEmitter<Hamburger>();

  hamburgerForm!: FormGroup;
  availableIngredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadIngredients();

    if (this.hamburger?.ingredients) {
      this.selectedIngredients = this.hamburger.ingredients.map((i: any) => i.ingredient ?? i);
    }
  }

  buildForm(): void {
    this.hamburgerForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      unity_price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((ingredients_id: any) => {
      this.availableIngredients = ingredients_id;
    });
  }

  onIngredientToggle(ingredient: Ingredient, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(i => i.ingredientId !== ingredient.ingredientId);
    }
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    return this.selectedIngredients.some(i => i.ingredientId === ingredient.ingredientId);
  }

  onSubmit(): void {
    this.hamburgerForm.value.ingredients_id = this.selectedIngredients.map(i => i.ingredientId);

    if (this.hamburgerForm.valid) {
      const formValue = this.hamburgerForm.value;

      const result: Hamburger = this.hamburger
        ? { ...this.hamburger, ...formValue, ingredients_id: this.selectedIngredients.map(i => i.ingredientId) }
        : { ...formValue, ingredients_id: this.selectedIngredients.map(i => i.ingredientId) };

      this.formSubmit.emit(result);
    }
  }
}
