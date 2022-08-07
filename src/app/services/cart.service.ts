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
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe((data) => {
        this.subject.next(data);
      });
  }

  async getCartCount(): Promise<number> {
    let count = 0;
    this.auth.updateBearer();
    let data = await this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .toPromise();

    data.forEach((p) => {
      count += p.quantity;
    });

    console.log(count);
    return count;
  }

  async getTotalPrice(): Promise<number> {
    let total = 0;
    this.auth.updateBearer();
    let data = await this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .toPromise();

    data.forEach((p) => {
      total += p.quantity * p.product.price;
    });
    return total;
  }

  
}
