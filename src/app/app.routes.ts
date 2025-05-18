import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customer/customers/customers.component';
import { DrinksComponent } from './components/drink/drinks/drinks.component';

export const routes: Routes = [
  {
    path: "customers",
    component: CustomersComponent,
    data: { title: 'Clientes' }
  },
  {
    path: "drinks",
    component: DrinksComponent,
    data: { title: 'Bebidas' }
  }
];
