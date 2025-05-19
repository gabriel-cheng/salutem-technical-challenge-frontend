import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrder } from '../../../model/customer_order';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderApiService {
  private apiUrl = '/api/customer_order';

  constructor(private http: HttpClient) {}

  getCustomerOrders(): Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>(this.apiUrl);
  }

  getCustomerOrder(CustomerOrderId: string): Observable<CustomerOrder> {
    return this.http.get<CustomerOrder>(`${this.apiUrl}/${CustomerOrderId}`);
  }

  addCustomerOrder(CustomerOrder: CustomerOrder): Observable<string> {
    const payload = CustomerOrder;

    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }

  updateCustomerOrder(CustomerOrderId: string, CustomerOrder: CustomerOrder): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/${CustomerOrderId}`,
      CustomerOrder,
      { responseType: 'text' as 'json' });
  }

  deleteCustomerOrder(CustomerOrderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${CustomerOrderId}`);
  }
}
