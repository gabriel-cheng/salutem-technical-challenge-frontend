import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customer/customers/customers.component';
import { DrinksComponent } from './components/drink/drinks/drinks.component';
import { IngredientsComponent } from './components/ingredient/ingredients/ingredients.component';
import { HamburgersComponent } from './components/hamburger/hamburgers/hamburgers.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';

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
  },
  {
    path: "ingredients",
    component: IngredientsComponent,
    data: { title: 'Hamburgueres' }
  },
  {
    path: "hamburgers",
    component: HamburgersComponent,
    data: { title: 'Hamburgueres' }
  },
  {
    path: "customer_orders",
    component: CustomerOrdersComponent,
    data: { title: 'Pedidos de clientes' }
  }
];
