import { Component } from '@angular/core';
import { CustomersComponent } from './components/customer/customers/customers.component';

@Component({
  selector: 'app-root',
  imports: [
    CustomersComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Salutem Challenge';
}
