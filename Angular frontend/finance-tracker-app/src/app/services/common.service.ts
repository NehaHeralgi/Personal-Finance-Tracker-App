import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
    const userId = localStorage.getItem('userId');  // Retrieve UserId from localStorage

    if (userId) {
        transaction.userId = userId;  // Add the UserId to the transaction object
    } else {
        console.error('User not logged in');
        return of(null);  // Handle case where UserId is not available
    }
    return this.http.post<any>(`${this.apiUrl}/Transaction/CreateTransaction`, transaction);
  }

  // Fetch categories for dropdown (this assumes you have an API for fetching categories)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Category/GetCategories`);
  }
}
