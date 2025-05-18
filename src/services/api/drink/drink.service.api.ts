import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../../../model/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkApiService {
  private apiUrl = '/api/drink';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  getById(id: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  addDrink(drink: Drink): Observable<string> {
    return this.http.post(this.apiUrl, drink, { responseType: 'text' });
  }

  updateDrink(id: string, drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${id}`, drink);
  }

  deleteDrink(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
