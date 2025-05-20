import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HamburgerRequestType, HamburgerResponseType } from '../../../model/hamburger';

@Injectable({
  providedIn: 'root'
})
export class HamburgerApiService {
  private apiUrl = '/api/hamburger';

  constructor(private http: HttpClient) {}

  getHamburgers(): Observable<HamburgerResponseType[]> {
    return this.http.get<HamburgerResponseType[]>(this.apiUrl);
  }

  getHamburger(hamburgerId: string): Observable<HamburgerResponseType> {
    return this.http.get<HamburgerResponseType>(`${this.apiUrl}/${hamburgerId}`);
  }

  addHamburger(hamburger: HamburgerRequestType): Observable<string> {
    const payload = hamburger;

    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }

  updateHamburger(hamburgerId: string, hamburger: HamburgerRequestType): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/${hamburgerId}`,
      hamburger,
      { responseType: 'text' as 'json' });
  }

  deleteHamburger(hamburgerId: string): Observable<string> {
    return this.http.delete<string>(
      `${this.apiUrl}/${hamburgerId}`,
      { responseType: 'text' as 'json' }
    );
  }
}
