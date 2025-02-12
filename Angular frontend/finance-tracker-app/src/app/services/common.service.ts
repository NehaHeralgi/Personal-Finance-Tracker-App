import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl = 'http://localhost:5185/api'; 

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any[]>(`${this.apiUrl}/Transaction/GetTransactions`, { headers });
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
  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Transaction/${transactionId}/DeleteTransaction`);
  }
  updateTransaction(transaction: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token
  const userId = localStorage.getItem('userId'); // Retrieve UserId

  if (!userId) {
    console.error('UserId is missing. Make sure the user is logged in.');
    return of(null);
  }

  transaction.userId = userId; // Ensure UserId is set

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put<any>(`${this.apiUrl}/Transaction/${transaction.id}/UpdateTransaction`, transaction, { headers });  }
  
  // Fetch categories for dropdown (this assumes you have an API for fetching categories)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Category/GetCategories`);
  }
}
