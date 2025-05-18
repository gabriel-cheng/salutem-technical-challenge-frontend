import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../model/customer';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, CustomerFormComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  isFormVisible = false;
  selectedCustomer: Customer | null = null;

  constructor(private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerApiService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  showCreateForm(): void {
    this.selectedCustomer = null;
    this.isFormVisible = true;
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
    this.isFormVisible = true;
  }

  onFormSubmited(customer: Customer) {
    if (customer.customer_id) {
      const { customer_id, ...data } = customer;
      this.customerApiService.updateCustomer(customer_id, data).subscribe({
        next: () => {
          this.loadCustomers();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao atualizar cliente:', err)
      });
    } else {
      this.customerApiService.addCustomer(customer).subscribe({
        next: () => {
          this.loadCustomers();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao criar cliente:', err)
      });
    }
  }


  onDeleteCustomer(customer_id: string): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.customerApiService.deleteCustomer(customer_id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customer_id !== customer_id);
        },
        error: err => console.error('Erro ao deletar cliente:', err)
      });
    }
  }
}
