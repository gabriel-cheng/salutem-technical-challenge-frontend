import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hamburger } from '../../../../model/hamburger';
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
  hamburgers: Hamburger[] = [];
  isFormVisible = false;
  selectedHamburger: Hamburger | null = null;

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

  editHamburger(hamburger: Hamburger): void {
    this.selectedHamburger = { ...hamburger };
    this.isFormVisible = true;
  }

  onFormSubmited(hamburger: Hamburger) {
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
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.hamburgerApiService.deleteHamburger(hamburgerId).subscribe({
        next: () => {
          this.hamburgers = this.hamburgers.filter(c => c.hamburgerId !== hamburgerId);
        },
        error: err => console.error('Erro ao deletar hamburger:', err)
      });
    }
  }
}

