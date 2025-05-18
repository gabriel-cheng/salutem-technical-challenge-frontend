import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customer/customers/customers.component';

export const routes: Routes = [
  {
    path: "/customers",
    component: CustomersComponent,
    data: { title: 'Clientes' }
  },
];
