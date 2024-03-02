import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get('http://localhost:5001/users/get', {
      withCredentials: true,
    });
  }

  adminLogin(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post('http://localhost:5001/users/login/admin', data, {
      withCredentials: true,
    });
  }

  adminRegister(
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
  ) {
    const data = { username, email, password, isAdmin };
    return this.http.post('http://localhost:5001/users/register', data);
  }

  userLogin(email: string, password: string) {
    const data = { email, password };
    return this.http.post('http://localhost:5001/users/login/user', data, {
      withCredentials: true,
    });
  }
  userRegister(
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
  ) {
    const data = { username, email, password, isAdmin };
    return this.http.post('http://localhost:5001/users/register', data);
  }

  logout() {
    return this.http.get('http://localhost:5001/users/logout', {
      withCredentials: true,
    });
  }
}
