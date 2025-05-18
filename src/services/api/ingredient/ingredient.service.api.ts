import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../../../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientApiService {
  private apiUrl = '/api/ingredient';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  getIngredient(ingredientId: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${ingredientId}`);
  }

  addIngredient(ingredient: Ingredient): Observable<string> {
    return this.http.post(this.apiUrl, ingredient, { responseType: 'text' });
  }

  updateIngredient(ingredientId: string, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${ingredientId}`, ingredient);
  }

  deleteIngredient(ingredientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ingredientId}`);
  }
}
