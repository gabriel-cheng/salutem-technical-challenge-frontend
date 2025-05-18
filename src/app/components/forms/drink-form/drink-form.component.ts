import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Drink } from '../../../../model/drink';
import { DrinkApiService } from '../../../../services/api/drink/drink.service.api';

@Component({
  selector: 'app-drink-form',
  templateUrl: './drink-form.component.html',
  imports: [ ReactiveFormsModule ]
})
export class DrinkFormComponent implements OnChanges {
  @Input() drink?: Drink;

  form: FormGroup;

  constructor(private fb: FormBuilder, private drinkApi: DrinkApiService) {
    this.form = this.fb.group({
      code: [''],
      description: [''],
      unity_price: [0],
      sugar_flag: ['']
    });
  }

  ngOnChanges(): void {
    if (this.drink) {
      this.form.patchValue(this.drink);
    }
  }

  onSubmit(): void {
    const drinkData = this.form.value;

    console.log(drinkData);

    if (drinkData.id) {
      this.drinkApi.updateDrink(drinkData.id, drinkData).subscribe({
        next: () => console.log('Bebida atualizada com sucesso.'),
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.drinkApi.addDrink(drinkData).subscribe({
        next: () => console.log('Bebida criada com sucesso.'),
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }
}
