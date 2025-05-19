import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomerOrder, OrderItemHamburger } from '../../../../model/customer_order';
import { Customer } from '../../../../model/customer';
import { Drink } from '../../../../model/drink';

import { CustomerOrderApiService } from '../../../../services/api/customer_order/customer_order.service.api';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';
import { HamburgerApiService } from '../../../../services/api/hamburger/hamburger.service.api';
import { Hamburger } from '../../../../model/hamburger';

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
  availableDrinks: Drink[] = [];

  availableHamburgers: Hamburger[] = [];
  selectedHamburgers: Hamburger[] = [];

  selectedDrinks: Drink[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerApiService,
    private drinkService: DrinkApiService,
    private hamburgerService: HamburgerApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCustomers();
    this.loadDrinks();
    this.loadHamburgers();

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
      observation: [this.customer_order?.observations || ''],
      customerId: [this.customer_order?.customer?.customer_id || '', Validators.required],
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

  loadHamburgers(): any {
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

  toggleHamburger(hamburger: Hamburger, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedHamburgers.push(hamburger);
    } else {
      this.selectedHamburgers = this.selectedHamburgers.filter(h => h.hamburgerId !== hamburger.hamburgerId);
    }
  }

  isDrinkSelected(drink: Drink): boolean {
    return this.selectedDrinks.some(d => d.drinkId === drink.drinkId);
  }

  isHamburgerSelected(hamburger: Hamburger): boolean {
    return this.selectedHamburgers.some(h => h.hamburgerId === hamburger.hamburgerId);
  }

  onSubmit(): void {
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
