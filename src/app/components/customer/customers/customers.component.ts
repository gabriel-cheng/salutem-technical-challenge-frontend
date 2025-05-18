import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../model/customer';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    CustomerFormComponent
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  isFormVisible = false;
  selectedCustomer: any = null;

  constructor(private customerService: CustomerApiService) {}

  showCreateForm() {
    this.selectedCustomer = null;
    this.isFormVisible = true;
  }

  onFormSubmited() {
    this.isFormVisible = false;
    this.loadCustomers();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      console.log(this.customers);
    });
  }

  onDeleteCustomer(customer_id: string) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.customerService.deleteCustomer(customer_id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customer_id !== customer_id);
        },
        error: error => {
          console.error('Erro ao deletar cliente:', error);
        }
      });
    }
  }

}
