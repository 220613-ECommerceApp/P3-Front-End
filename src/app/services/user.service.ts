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

  private apiUrl = '/users'

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Get method to retrieve User from backend


  getUser(): Observable<User> {  

    this.auth.updateBearer();
    return this.http.get<User>(environment.baseUrl + this.apiUrl, httpOptions ); 
   
   

  }



  // ADDING FUNCTIONALITY FOR UPDATING USER

  updateUser(User: User): Observable<User>{

    this.auth.updateBearer();
    return this.http.put<User>(environment.baseUrl + this.apiUrl, JSON.stringify(User), httpOptions);
  }
}
