import { IngredientWrapper } from "./customer_order";
import { Ingredient } from "./ingredient";

export class Hamburger {
  hamburgerId?: string;
  code: string;
  description: string;
  unity_price: number;
  ingredients: IngredientWrapper[];

  constructor(
    hamburgerId: string,
    code: string,
    description: string,
    unity_price: number,
    ingredients: IngredientWrapper[]
  ) {
    this.hamburgerId = hamburgerId;
    this.code = code;
    this.description = description;
    this.unity_price = unity_price;
    this.ingredients = ingredients;
  }
}
