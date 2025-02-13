import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5185/api/Auth';
  constructor(private http: HttpClient) { }

  // Login method
  login(email: string, password: string): Observable<{ token: string,userId:string }> {
    const loginPayload = { email, password };
    localStorage.setItem('emailid', email);
    return this.http.post<{ token: string,userId:string }>(`${this.apiUrl}/login`, loginPayload);
  }
   // register method
   register(email: string, password: string): Observable<{ token: string }> {
    const loginPayload = { email, password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, loginPayload);
  }
   // Logout method (Client-side)
   logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem('token');
  }

}
