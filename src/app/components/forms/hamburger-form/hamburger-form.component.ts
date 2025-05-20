import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HamburgerRequestType } from '../../../../model/hamburger';
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
  @Input() hamburger: HamburgerRequestType | null = null;
  @Output() formSubmit = new EventEmitter<HamburgerRequestType>();

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
  }

  buildForm(): void {
    this.hamburgerForm = this.fb.group({
      code: [this.hamburger?.code || '', Validators.required],
      description: [this.hamburger?.description || '', Validators.required],
      unity_price: [this.hamburger?.unity_price || 0, [Validators.required, Validators.min(0.01)]],
    });
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => {
      this.availableIngredients = ingredients;

      if (this.hamburger?.ingredients_id) {
        this.selectedIngredients = this.availableIngredients.filter(i =>
          i.ingredientId && this.hamburger!.ingredients_id!.includes(i.ingredientId)
        );
      }
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
    if (this.hamburgerForm.valid) {
      const formValue = this.hamburgerForm.value;

      const result: HamburgerRequestType = this.hamburger
      ? { ...this.hamburger, ...formValue, ingredients_id: this.selectedIngredients.map(i => i.ingredientId) }
      : { ...formValue, ingredients_id: this.selectedIngredients.map(i => i.ingredientId) };

      this.formSubmit.emit(result);
    }
  }
}
