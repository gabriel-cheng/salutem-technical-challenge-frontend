import { IngredientWrapper } from "./customer_order";

export class HamburgerResponseType {
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

export class HamburgerRequestType {
  hamburgerId?: string;
  code: string;
  description: string;
  unity_price: number;
  ingredients_id: string[];

  constructor(
    hamburgerId: string,
    code: string,
    description: string,
    unity_price: number,
    ingredients_id: string[]
  ) {
    this.hamburgerId = hamburgerId;
    this.code = code;
    this.description = description;
    this.unity_price = unity_price;
    this.ingredients_id = ingredients_id;
  }
}
