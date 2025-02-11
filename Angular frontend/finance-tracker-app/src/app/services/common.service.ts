import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl = 'http://localhost:5185/api'; 

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Transaction/GetTransactions`);
  }
  // Call to API to add a transaction
  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Transaction/CreateTransaction`, transaction);
  }

  // Fetch categories for dropdown (this assumes you have an API for fetching categories)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Category/GetCategories`);
  }
}
