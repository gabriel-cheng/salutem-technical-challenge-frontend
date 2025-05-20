import { Customer } from './customer';
import { Drink } from './drink';
import { HamburgerResponseType } from './hamburger';

export interface IngredientWrapper {
  ingredient: {
    ingredientId: string;
    code: string;
    description: string;
    unity_price: number;
    additional_flag: string;
  };
}

export interface OrderItemHamburger {
  hamburger: HamburgerResponseType;
}

export interface OrderItemDrink {
  drink: Drink;
}

export interface Observation {
  customer_order_observation: string;
}

export interface CustomerOrder {
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
}
