import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HamburgerRequestType, HamburgerResponseType } from '../../../../model/hamburger';
import { Ingredient } from '../../../../model/ingredient';
import { IngredientApiService } from '../../../../services/api/ingredient/ingredient.service.api';
import { CommonModule } from '@angular/common';
import { CustomerOrderRequest, IngredientWrapper, Observation, OrderItemDrink, OrderItemHamburger } from '../../../../model/customer_order';
import { HamburgerApiService } from '../../../../services/api/hamburger/hamburger.service.api';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';
import { Drink } from '../../../../model/drink';

@Component({
  selector: 'app-customer-order-form',
  standalone: true,
  templateUrl: './customer-order-form.component.html',
  styleUrls: ['./customer-order-form.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CustomerOrderFormComponent implements OnInit {
  @Input() customer_order: CustomerOrderRequest | null = null;
  @Output() formSubmit = new EventEmitter<CustomerOrderRequest>();

  customerOrderForm!: FormGroup;

  availableHamburgers: HamburgerResponseType[] = [];
  selectedHamburgers: OrderItemHamburger[] = [];

  availableDrinks: Drink[] = [];
  selectedDrinks: OrderItemDrink[] = [];

  observations: Observation[] = [];

  availableIngredients: Ingredient[] = [];
  selectedIngredients: IngredientWrapper[] = [];

  constructor(
    private fb: FormBuilder,
    private hamburgerService: HamburgerApiService,
    private drinkService: DrinkApiService,
    private ingredientService: IngredientApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadHamburger();
    this.loadDrink();
    this.loadAdditional();
  }

  buildForm(): void {
    this.customerOrderForm = this.fb.group({
      code: [this.customer_order?.code || '', Validators.required],
      description: [this.customer_order?.description || '', Validators.required],
      created_at: [this.customer_order?.created_at || '', Validators.required]
    });
  }

  loadHamburger(): void {
    this.hamburgerService.getHamburgers().subscribe((hamburgers: HamburgerResponseType[]) => {
      this.availableHamburgers = hamburgers;
    });
  }

  loadDrink(): void {
    this.drinkService.getDrinks().subscribe((drinks: Drink[]) => {
      this.availableDrinks = drinks;
    });
  }

  loadAdditional(): void {
    this.ingredientService.getIngredients().subscribe((ingredients: Ingredient[]) => {
      this.availableIngredients = ingredients.filter(i => i.additional_flag == "yes");
    });
  }

  onIngredientToggle(ingredient: Ingredient, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIngredients.map((i) => {
        i.ingredient = ingredient;
      });
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(i => i.ingredient.ingredientId !== ingredient.ingredientId);
    }
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    return this.selectedIngredients.some(i => i.ingredient.ingredientId === ingredient.ingredientId);
  }

  onSubmit(): void {
    if (this.customerOrderForm.valid) {
      const formValue = this.customerOrderForm.value;

      const result: CustomerOrderRequest = this.customer_order
      ? { ...this.customer_order, ...formValue, additional: this.selectedIngredients.map((i) => i.ingredient.ingredientId) }
      : { ...formValue, additional: this.selectedIngredients.map(i => i.ingredient.ingredientId) };

      this.formSubmit.emit(result);
    }
  }
}
