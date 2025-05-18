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

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  getDrink(drinkId: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${drinkId}`);
  }

  addDrink(drink: Drink): Observable<string> {
    return this.http.post(this.apiUrl, drink, { responseType: 'text' });
  }

  updateDrink(drinkId: string, drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${drinkId}`, drink);
  }

  deleteDrink(drinkId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${drinkId}`);
  }
}
