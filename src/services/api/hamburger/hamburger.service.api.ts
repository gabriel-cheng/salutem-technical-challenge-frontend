import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hamburger } from '../../../model/hamburger';

@Injectable({
  providedIn: 'root'
})
export class HamburgerApiService {
  private apiUrl = '/api/hamburger';

  constructor(private http: HttpClient) {}

  getHamburgers(): Observable<Hamburger[]> {
    return this.http.get<Hamburger[]>(this.apiUrl);
  }

  getHamburger(hamburgerId: string): Observable<Hamburger> {
    return this.http.get<Hamburger>(`${this.apiUrl}/${hamburgerId}`);
  }

  addHamburger(hamburger: Hamburger): Observable<string> {
    const payload = hamburger;

    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }

  updateHamburger(hamburgerId: string, hamburger: Hamburger): Observable<Hamburger> {
    return this.http.put<Hamburger>(`${this.apiUrl}/${hamburgerId}`, hamburger);
  }

  deleteHamburger(hamburgerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${hamburgerId}`);
  }
}
