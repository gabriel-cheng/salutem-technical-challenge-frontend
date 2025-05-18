export class Ingredient {
  ingredientId?: string;
  code: string;
  description: string;
  unity_price: number;
  additional_flag: string;

  constructor(
    ingredientId: string,
    code: string,
    description: string,
    unity_price: number,
    additional_flag: string
    ) {
    this.ingredientId = ingredientId;
    this.code = code;
    this.description = description;
    this.unity_price = unity_price;
    this.additional_flag = additional_flag;
  }
}
