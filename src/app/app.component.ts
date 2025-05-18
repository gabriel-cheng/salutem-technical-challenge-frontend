import { Component } from '@angular/core';
import { CustomersComponent } from './components/customer/customers/customers.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    CustomersComponent,
    RouterModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Salutem Challenge';
}
