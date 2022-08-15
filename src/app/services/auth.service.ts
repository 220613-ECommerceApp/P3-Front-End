import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;

  isLoggedIn(): boolean {
    return localStorage.getItem('token') == null ? false : true;
  }

  constructor(private http: HttpClient) { }

  updateBearer(): void {
    environment.headers.Authorization = "Bearer " + localStorage.getItem("token")
  }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers});
  }

  logout(): void{
    environment.headers.Authorization = ''
    localStorage.removeItem("token")
  }

  register(userName: string, firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {username: userName, firstname: firstName, lastname: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
}
