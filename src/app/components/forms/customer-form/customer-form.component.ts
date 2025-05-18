import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerApiService } from '../../../../services/api/customer/customer.service.api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: any = null;
  @Output() formSubmit = new EventEmitter<void>();
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: [this.customer?.name || '', Validators.required],
      address: [this.customer?.address || '', Validators.required],
      cell: [this.customer?.cell || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    const customerData = this.customerForm.value;

    if (this.customer) {
      this.customerApiService.updateCustomer(this.customer.customer_id, customerData)
        .subscribe(() => this.formSubmit.emit());
    } else {
      this.customerApiService.addCustomer(customerData)
        .subscribe(() => this.formSubmit.emit());
    }
  }
}
