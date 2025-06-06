import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model'; // Adjust the import path as necessary
import {environment} from '../../../environments/environment'; // Import environment for API URL

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`; // Use environment variable for API URL

  constructor(private http: HttpClient) { }

  // HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Create a new user
  createUser(user: User): Observable<User> {
    user.password = '123'
    user.permissions = ['2']; // permission for notification service
    return this.http.post<User>(this.apiUrl, user, this.httpOptions);
  }

  // Get count of users (optionally with where clause)
  getCount(where?: any): Observable<{count: number}> {
    const url = where ? `${this.apiUrl}/count?where=${JSON.stringify(where)}` : `${this.apiUrl}/count`;
    return this.http.get<{count: number}>(url);
  }

  // Get all users (optionally with filter)
  getAllUsers(filter?: any): Observable<User[]> {
    const url = filter ? `${this.apiUrl}?filter=${JSON.stringify(filter)}` : this.apiUrl;
    return this.http.get<User[]>(url);
  }

  // Update all users matching the where clause
  updateAllUsers(user: Partial<User>, where?: any): Observable<{count: number}> {
    const url = where ? `${this.apiUrl}?where=${JSON.stringify(where)}` : this.apiUrl;
    return this.http.patch<{count: number}>(url, user, this.httpOptions);
  }

  // Get user by ID
  getUserById(id: number, filter?: any): Observable<User> {
    const url = filter ? `${this.apiUrl}/${id}?filter=${JSON.stringify(filter)}` : `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  // Update user by ID
  updateUserById(id: number, user: Partial<User>): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  // Replace user by ID
  replaceUserById(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  // Delete user by ID
  deleteUserById(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}