import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartitem } from '../models/cartitem';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  subject: Subject<Cartitem[]> = new Subject<Cartitem[]>();
  //fetch cartItem table for logged-in user
  getCart(): void {
    this.auth.updateBearer();
    this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {headers: environment.headers,})
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.subject.next(data);
      });
  }
}
