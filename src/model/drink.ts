export class Drink {
  drinkId?: string;
  code: string;
  description: string;
  unity_price: number;
  sugar_flag: string;

  constructor(
    drinkId: string,
    code: string,
    description: string,
    unity_price: number,
    sugar_flag: string
    ) {
    this.drinkId = drinkId;
    this.code = code;
    this.description = description;
    this.unity_price = unity_price;
    this.sugar_flag = sugar_flag;
  }
}
