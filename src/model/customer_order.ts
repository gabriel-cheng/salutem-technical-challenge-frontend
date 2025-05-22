import { Customer } from './customer';
import { Drink } from './drink';
import { HamburgerResponseType } from './hamburger';
import { Ingredient } from './ingredient';

export class IngredientWrapper {
  ingredient: Ingredient;

  constructor(
    ingredient: Ingredient
  ) {
    this.ingredient = ingredient;
  }
}

export class OrderItemHamburger {
  hamburger: HamburgerResponseType;

  constructor(
    hamburger: HamburgerResponseType
  ) {
    this.hamburger = hamburger;
  }
}

export class OrderItemDrink {
  drink: Drink;

  constructor(
    drink: Drink
  ) {
    this.drink = drink;
  }
}

export class Observation {
  customer_order_observation: string;

  constructor(
    customer_order_observation: string
  ) {
    this.customer_order_observation = customer_order_observation;
  }
}

export class CustomerOrderRequest {
  customerOrderId?: string;
  code: string;
  description: string;
  created_at: string;
  customer_id: Customer;
  observations: string[];
  hamburger_id:string[];
  drink_id: string[];
  additional: string[];

  constructor(
    customerOrderId: string,
    code: string,
    description: string,
    created_at: string,
    customer_id: Customer,
    hamburger_id: string[],
    drink_id: string[],
    observations: string[],
    additional: string[]
  ) {
    this.customerOrderId = customerOrderId,
    this.code = code;
    this.description = description;
    this.created_at = created_at;
    this.customer_id = customer_id;
    this.hamburger_id = hamburger_id;
    this.drink_id = drink_id;
    this.observations = observations;
    this.additional = additional;
  }
}

export class CustomerOrderResponse {
  customerOrderId: string;
  code: string;
  description: string;
  created_at: string;
  final_price: number;
  customer: Customer;
  hamburgers: OrderItemHamburger[];
  drinks: OrderItemDrink[];
  observations: Observation[];
  additional: IngredientWrapper[];

  constructor(
    customerOrderId: string,
    code: string,
    description: string,
    created_at: string,
    final_price: number,
    customer: Customer,
    hamburgers: OrderItemHamburger[],
    drinks: OrderItemDrink[],
    observations: Observation[],
    additional: IngredientWrapper[]
  ) {
    this.customerOrderId = customerOrderId;
    this.code = code;
    this.description = description;
    this.created_at = created_at;
    this.final_price = final_price;
    this.customer = customer;
    this.hamburgers = hamburgers;
    this.drinks = drinks;
    this.observations = observations;
    this.additional = additional;
  }
}
