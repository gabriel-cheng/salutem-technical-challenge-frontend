import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HamburgerRequestType, HamburgerResponseType } from '../../../../model/hamburger';
import { Ingredient } from '../../../../model/ingredient';
import { IngredientApiService } from '../../../../services/api/ingredient/ingredient.service.api';
import { CommonModule } from '@angular/common';
import { CustomerOrderRequest, IngredientWrapper, Observation, OrderItemDrink, OrderItemHamburger } from '../../../../model/customer_order';
import { HamburgerApiService } from '../../../../services/api/hamburger/hamburger.service.api';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';
import { Drink } from '../../../../model/drink';
import { Customer } from '../../../../model/customer';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';

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

  availableCustomers: Customer[] = [];
  customerSelected: Customer[]= [];

  availableHamburgers: HamburgerResponseType[] = [];
  selectedHamburgers: OrderItemHamburger[] = [];

  availableDrinks: Drink[] = [];
  selectedDrinks: OrderItemDrink[] = [];

  informedObservations: string[] = [];

  availableAdditional: Ingredient[] = [];
  selectedAdditional: IngredientWrapper[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerApiService,
    private hamburgerService: HamburgerApiService,
    private drinkService: DrinkApiService,
    private ingredientService: IngredientApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadHamburger();
    this.loadDrink();
    this.loadAdditional();
    this.loadCustomers();
  }

  buildForm(): void {
    this.customerOrderForm = this.fb.group({
      customer_id: [this.customer_order?.customer_id || '', Validators.required],
      code: [this.customer_order?.code || '', Validators.required],
      observations: [this.customer_order?.observations || ''],
      description: [this.customer_order?.description || '', Validators.required],
      created_at: [this.customer_order?.created_at || '', Validators.required]
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.availableCustomers = customers;
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
      this.availableAdditional = ingredients.filter(i => i.additional_flag == "yes");
    });
  }

  onCustomerSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if(selectedValue) {
      this.customerSelected = this.availableCustomers.filter(i => i.customer_id == selectedValue);
    }
  }

  onHamburgerToggle(hamburger: HamburgerResponseType, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if(checked) {
      this.selectedHamburgers.push({ hamburger });
      return;
    }

    this.selectedHamburgers = this.selectedHamburgers.filter(i => i.hamburger.hamburgerId !== hamburger.hamburgerId);
  }

  onDrinkToggle(drink: Drink, event: Event): void {
    const checked = (event.target as HTMLInputElement);

    if(checked) {
      this.selectedDrinks.push({ drink });

      return;
    }

    this.selectedDrinks = this.selectedDrinks.filter(i => i.drink.drinkId !== drink.drinkId);
  }

  onAdditionalToggle(ingredient: Ingredient, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if(checked) {
      this.selectedAdditional.push({ ingredient });
      return;
    }

    this.selectedAdditional = this.selectedAdditional.filter(i => i.ingredient.ingredientId !== ingredient.ingredientId);
  }

  isHamburgerSelected(hamburger: HamburgerResponseType): boolean {
    return this.selectedHamburgers.some(i => i.hamburger.hamburgerId === hamburger.hamburgerId);
  }

  isDrinkSelected(drink: Drink): boolean {
    return this.selectedDrinks.some(i => i.drink.drinkId === drink.drinkId);
  }

  isAdditionalSelected(ingredient: Ingredient): boolean {
    return this.selectedAdditional.some(i => i.ingredient.ingredientId === ingredient.ingredientId);
  }

  updateObservationsFromText(): string[] {
    const text = this.customerOrderForm.get('observations')?.value || '';
    const observationArray = text.split(';')

    const observationsFormArray = new FormArray(
      observationArray.map((text: string) => new FormControl(text))
    );

    return observationsFormArray.value;
  }

  onSubmit(): void {
    if (this.customerOrderForm.valid) {
      const formValue = this.customerOrderForm.value;

      this.updateObservationsFromText();

      const result: CustomerOrderRequest = this.customer_order
      ? { ...this.customer_order, ...formValue, additional: this.selectedAdditional.map((i) => i.ingredient.ingredientId) }
      : { ...formValue, additional: this.selectedAdditional.map(i => i.ingredient.ingredientId) };

      result.observations = this.updateObservationsFromText();
      result.hamburger_id = this.selectedHamburgers.map(i => i.hamburger.hamburgerId!);
      result.drink_id = this.selectedDrinks.map(i => i.drink.drinkId!);

      this.formSubmit.emit(result);
    }
  }
}
