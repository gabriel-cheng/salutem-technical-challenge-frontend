import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomerOrder, Observation, OrderItemHamburger } from '../../../../model/customer_order';
import { Customer } from '../../../../model/customer';
import { Drink } from '../../../../model/drink';

import { CustomerOrderApiService } from '../../../../services/api/customer_order/customer_order.service.api';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';
import { HamburgerApiService } from '../../../../services/api/hamburger/hamburger.service.api';
import { HamburgerResponseType } from '../../../../model/hamburger';
import { Ingredient } from '../../../../model/ingredient';
import { IngredientApiService } from '../../../../services/api/ingredient/ingredient.service.api';

@Component({
  selector: 'app-customer-order-form',
  standalone: true,
  templateUrl: './customer-order-form.component.html',
  styleUrls: ['./customer-order-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CustomerOrderFormComponent implements OnInit {
  @Input() customer_order: CustomerOrder | null = null;
  @Output() formSubmit = new EventEmitter<CustomerOrder>();

  customerOrderForm!: FormGroup;

  customers: Customer[] = [];

  availableObservarion: Observation[] = [];
  selectedObservarion: Observation[] = [];

  availableDrinks: Drink[] = [];
  selectedDrinks: Drink[] = [];

  availableHamburgers: HamburgerResponseType[] = [];
  selectedHamburgers: HamburgerResponseType[] = [];

  availableAdditional: Ingredient[] = [];
  selectedAdditional: Ingredient[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerApiService,
    private drinkService: DrinkApiService,
    private hamburgerService: HamburgerApiService,
    private ingredientService: IngredientApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCustomers();
    this.loadDrinks();
    this.loadHamburgers();
    this.loadAdditional();

    if (this.customer_order) {
      this.selectedDrinks = (this.customer_order.drinks || [])
        .map(orderItemDrink =>
          this.availableDrinks.find(drink => drink.drinkId === orderItemDrink.drink.drinkId)
        )
        .filter((drink): drink is Drink => !!drink);
      this.customerOrderForm.patchValue({
        customerId: this.customer_order.customer?.customer_id || ''
      });
    }
  }

  buildForm(): void {
    this.customerOrderForm = this.fb.group({
      code: [this.customer_order?.code || '', Validators.required],
      created_at: [this.customer_order?.created_at || '', Validators.required],
      description: [this.customer_order?.description || '', Validators.required],
      observation: [''],
      observations: [this.customer_order?.observations || this.fb.array([])],
      customerId: [this.customer_order?.customer?.customer_id || '', Validators.required],
       hamburgers: [this.customer_order?.hamburgers?.map(h => h.hamburger.hamburgerId) || this.selectedHamburgers.map(i => i.hamburgerId)],
      drinks: [this.customer_order?.drinks?.map(d => d.drink.drinkId) || this.selectedDrinks.map(i => i.drinkId)],
      additional: [this.customer_order?.additional?.map(a => a.ingredient.ingredientId) || this.selectedAdditional.map(i => i.ingredientId)]
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  loadDrinks(): void {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.availableDrinks = drinks;
    });
  }

  loadAdditional(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.availableAdditional = ingredients.filter(i => i.additional_flag !== "no");
    });
  }

  loadHamburgers(): void {
    this.hamburgerService.getHamburgers().subscribe(hamburgers => {
      this.availableHamburgers = hamburgers;
    });
  }

  toggleDrink(drink: Drink, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedDrinks.push(drink);
    } else {
      this.selectedDrinks = this.selectedDrinks.filter(d => d.drinkId !== drink.drinkId);
    }
  }

  toggleHamburger(hamburger: HamburgerResponseType, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedHamburgers.push(hamburger);
    } else {
      this.selectedHamburgers = this.selectedHamburgers.filter(h => h.hamburgerId !== hamburger.hamburgerId);
    }
  }

  toggleAdditional(additional: Ingredient, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedAdditional.push(additional);
    } else {
      this.selectedAdditional = this.selectedAdditional.filter(a => a.ingredientId !== additional.ingredientId);
    }
  }

  isDrinkSelected(drink: Drink): boolean {
    return this.selectedDrinks.some(d => d.drinkId === drink.drinkId);
  }

  isHamburgerSelected(hamburger: HamburgerResponseType): boolean {
    return this.selectedHamburgers.some(h => h.hamburgerId === hamburger.hamburgerId);
  }

  isAdditionalSelected(additional: Ingredient): boolean {
    return this.selectedAdditional.some(a => a.ingredientId === additional.ingredientId);
  }

  updateObservationsFromText(): void {
    const text = this.customerOrderForm.get('observation')?.value || '';
    const observationArray = text.split(';')

    const observationsFormArray = new FormArray(
      observationArray.map((text: string) => this.fb.group([text]))
    );

    this.customerOrderForm.setControl('observations', observationsFormArray);
    this.customerOrderForm.removeControl('observation');
  }

  onSubmit(): void {
    console.log(this.customerOrderForm.value);
    console.log(this.fb.array([]));
    if (this.customerOrderForm.valid) {
      const formValue = this.customerOrderForm.value;

      const result: CustomerOrder = {
        ...formValue,
        drinks: this.selectedDrinks,
        hamburgers: this.selectedHamburgers
      };

      this.formSubmit.emit(result);
    }
  }
}
