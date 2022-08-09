import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../components/Interfaces/IUser';
import {User} from '../models/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: environment.headers,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users'

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Get method to retrieve User from backend

  getUser(): Observable<User> {  // How do I import user from backend?
    this.auth.updateBearer();
    return this.http.get<User>(this.apiUrl, httpOptions ); 
   
   

  }

  //Update Method to update user from backend

  // updateUser(User): Observable<User> {
  //   const url = `${this.apiUrl}/${User.id}`;
  //   return this.http.put<User>(url, User, httpOptions);
  // }
}

// This is where I need to get the user info from backend
