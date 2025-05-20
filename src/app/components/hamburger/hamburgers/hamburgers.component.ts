import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerRequestType, HamburgerResponseType } from '../../../../model/hamburger';
import { HamburgerFormComponent } from '../../forms/hamburger-form/hamburger-form.component';
import { HamburgerApiService } from '../../../../services/api/hamburger/hamburger.service.api';

@Component({
  selector: 'app-hamburgers',
  standalone: true,
  imports: [CommonModule, HamburgerFormComponent],
  templateUrl: './hamburgers.component.html',
  styleUrls: ['./hamburgers.component.css']
})
export class HamburgersComponent implements OnInit {
  hamburgers: HamburgerResponseType[] = [];
  isFormVisible = false;
  selectedHamburger: HamburgerRequestType | null = null;

  constructor(private hamburgerApiService: HamburgerApiService) {}

  ngOnInit(): void {
    this.loadHamburgers();
  }

  loadHamburgers(): void {
    this.hamburgerApiService.getHamburgers().subscribe(data => {
      this.hamburgers = data;
    });
  }

  showCreateForm(): void {
    this.selectedHamburger = null;
    this.isFormVisible = true;
  }

  editHamburger(hamburger: HamburgerResponseType): void {
    this.selectedHamburger = {
      hamburgerId: hamburger.hamburgerId,
      code: hamburger.code,
      description: hamburger.description,
      unity_price: hamburger.unity_price,
      ingredients_id: hamburger.ingredients.map(item => item.ingredient.ingredientId!)
    };
    this.isFormVisible = true;
  }

  onFormSubmited(hamburger: HamburgerRequestType) {
    if (hamburger.hamburgerId) {
      const { hamburgerId, ...data } = hamburger;
      this.hamburgerApiService.updateHamburger(hamburgerId, data).subscribe({
        next: () => {
          this.loadHamburgers();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao atualizar hamburger:', err)
      });
    } else {
      this.hamburgerApiService.addHamburger(hamburger).subscribe({
        next: () => {
          this.loadHamburgers();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao criar hamburger:', err)
      });
    }
  }

  onDeleteHamburger(hamburgerId: string): void {
    if (confirm('Tem certeza que deseja deletar este hamburger?')) {
      this.hamburgerApiService.deleteHamburger(hamburgerId).subscribe({
        next: () => {
          this.hamburgers = this.hamburgers.filter(h => h.hamburgerId !== hamburgerId);
        },
        error: err => console.error('Erro ao deletar hamburger:', err)
      });
    }
  }
}
