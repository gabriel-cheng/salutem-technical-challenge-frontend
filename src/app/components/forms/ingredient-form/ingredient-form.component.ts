import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../../model/ingredient';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent implements OnInit, OnChanges {
  @Input() ingredient: Ingredient | null = null;
  @Output() formSubmit = new EventEmitter<Ingredient>();

  ingredientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ingredient'] && changes['ingredient'].currentValue) {
      if (this.ingredientForm) {
        this.ingredientForm.patchValue(changes['ingredient'].currentValue);
      }
    }
  }

  private buildForm(): void {
    this.ingredientForm = this.fb.group({
      code: [this.ingredient?.code || '', Validators.required],
      description: [this.ingredient?.description || '', Validators.required],
      unity_price: [this.ingredient?.unity_price || 0, Validators.required],
      additional_flag: [this.ingredient?.additional_flag || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.valid) {
      const formValue = this.ingredientForm.value;

      const result: Ingredient = this.ingredient
        ? { ...this.ingredient, ...formValue }
        : formValue;

      this.formSubmit.emit(result);
    }
  }
}
