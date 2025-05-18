import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Drink } from '../../../../model/drink';

@Component({
  selector: 'app-drink-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drink-form.component.html'
})
export class DrinkFormComponent implements OnInit, OnChanges {
  @Input() drink: Drink | null = null;
  @Output() formSubmit = new EventEmitter<Drink>();

  drinkForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drink'] && changes['drink'].currentValue) {
      if (this.drinkForm) {
        this.drinkForm.patchValue(changes['drink'].currentValue);
      }
    }
  }

  private buildForm(): void {
    this.drinkForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      unity_price: [0, Validators.required],
      sugar_flag: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.drinkForm.valid) {
      const formValue = this.drinkForm.value;

      const result: Drink = this.drink
        ? { ...this.drink, ...formValue }
        : formValue;

      this.formSubmit.emit(result);
    }
  }
}
