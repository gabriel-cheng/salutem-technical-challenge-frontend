import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrderRequest, CustomerOrderResponse } from '../../../model/customer_order';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderApiService {
  private apiUrl = '/api/customer_order';

  constructor(private http: HttpClient) {}

  getCustomerOrders(): Observable<CustomerOrderResponse[]> {
    return this.http.get<CustomerOrderResponse[]>(this.apiUrl);
  }

  getCustomerOrder(CustomerOrderId: string): Observable<CustomerOrderResponse> {
    return this.http.get<CustomerOrderResponse>(`${this.apiUrl}/${CustomerOrderId}`);
  }

  addCustomerOrder(CustomerOrder: CustomerOrderRequest): Observable<string> {
    const payload = CustomerOrder;

    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }

  updateCustomerOrder(CustomerOrderId: string, CustomerOrder: CustomerOrderRequest): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/${CustomerOrderId}`,
      CustomerOrder,
      { responseType: 'text' as 'json' });
  }

  deleteCustomerOrder(CustomerOrderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${CustomerOrderId}`);
  }
}
