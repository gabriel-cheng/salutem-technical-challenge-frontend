import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrderRequest, CustomerOrderResponse } from '../../../model/customer_order';
import { CustomerOrderFormComponent } from '../forms/customer-order-form/customer-order-form.component';
import { CustomerOrderApiService } from '../../../services/api/customer_order/customer_order.service.api';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [
    CommonModule,
    CustomerOrderFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  customer_orders: CustomerOrderResponse[] = [];
  isFormVisible = false;
  selectedCustomerOrder: CustomerOrderRequest | null = null;

  constructor(private customerOrderApiService: CustomerOrderApiService) {}

  ngOnInit(): void {
    this.loadCustomerOrders();
  }

  loadCustomerOrders(): void {
    this.customerOrderApiService.getCustomerOrders().subscribe(data => {
      this.customer_orders = data;
    });
  }

  showCreateForm(): void {
    this.selectedCustomerOrder = null;
    this.isFormVisible = true;
  }

  editCustomerOrder(customer_order: CustomerOrderRequest): void {
    this.selectedCustomerOrder = { ...customer_order };
    this.isFormVisible = true;
  }

  onFormSubmited(customer_order: CustomerOrderRequest) {
    if (customer_order.customerOrderId) {
      this.customerOrderApiService.updateCustomerOrder(
        customer_order.customerOrderId,
        customer_order
      ).subscribe({
        next: () => {
          this.loadCustomerOrders();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao atualizar pedido de cliente:', err)
      });
    } else {
      this.customerOrderApiService.addCustomerOrder(customer_order).subscribe({
        next: () => {
          this.loadCustomerOrders();
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erro ao criar pedido de cliente:', err)
      });
    }
  }

  onDeleteCustomerOrder(customerOrderId: string): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.customerOrderApiService.deleteCustomerOrder(customerOrderId).subscribe({
        next: () => {
          this.customer_orders = this.customer_orders.filter(c => c.customerOrderId !== customerOrderId);
        },
        error: err => console.error('Erro ao deletar pedido de cliente:', err)
      });
    }
  }
}

