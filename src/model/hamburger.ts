import { Ingredient } from "./ingredient";

export class Hamburger {
  hamburgerId?: string;
  code: string;
  description: string;
  unity_price: number;
  ingredients: Array<{ ingredient: Ingredient }>;

  constructor(
    hamburgerId: string,
    code: string,
    description: string,
    unity_price: number,
    ingredients: Array<{ ingredient: Ingredient }>
  ) {
    this.hamburgerId = hamburgerId;
    this.code = code;
    this.description = description;
    this.unity_price = unity_price;
    this.ingredients = ingredients;
  }
}
