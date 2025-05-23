import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Customer } from '../../../model/customer';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = '/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(apiUrl)
    .pipe(
      tap(customers => console.log('Read customers')),
      catchError(this.handleError('getCustomers', []))
    );
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${apiUrl}/${id}`;

    return this.http.get<Customer>(url)
    .pipe(
      tap(_ => console.log(`Read customer ${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {

    return this.http.post<Customer>(apiUrl, customer, httpOptions)
    .pipe(
      tap((customer: Customer) => console.log(`Customer added with id=${customer.customer_id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    )
  }

  updateCustomer(customer_id: string, customer: Customer): Observable<Customer> {
    const url = `${apiUrl}/${customer_id}`;

    delete customer.customerOrders;

    return this.http.put<Customer>(url, customer, httpOptions)
    .pipe(
      tap(_ => console.log(`Updated customer with id ${customer_id}`)),
      catchError(this.handleError<Customer>(`updateCustomer`))
    );
  }

  deleteCustomer(customer_id: string): Observable<Customer> {
    const url = `${apiUrl}/${customer_id}`;

    return this.http.delete<Customer>(url, httpOptions)
    .pipe(
      tap(_ => console.log(`Deleted customer with id ${customer_id}`)),
      catchError(this.handleError<Customer>(`deleteCustomer`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(result as T);
    };
  }
}
