import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartitem } from '../models/cartitem';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // cartitems: Cartitem[]=[];
  // subject: Subject<Cartitem[]> = new Subject<Cartitem[]>();

  //fetch cartItem table for logged-in user
  getCart(): Observable<Cartitem[]> {
    this.auth.updateBearer();
    return this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
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

  updateQuantity(newQuantity: number, productId: number): void {
    this.auth.updateBearer();
    this.http
      .put<Cartitem>(
        environment.baseUrl + `/api/cart/updatecart/${productId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: environment.headers.Authorization,
            'Content-Type': environment.headers['Content-Type'],
            quantity: `${newQuantity}`,
          }),
        }
      )
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe();
  }

  addToCart(productId: number, quantity: number) {
    this.auth.updateBearer();
    this.http
      .post<Cartitem>(
        environment.baseUrl + `/api/cart/addtocart/${productId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: environment.headers.Authorization,
            'Content-Type': environment.headers['Content-Type'],
            quantity: `${quantity}`,
          }),
        }
      )
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      ).subscribe();
    // .subscribe((data) => {
    //   this.cartitems.push(data);
    //   this.subject.next(this.cartitems);
    // });
  }

  removeItem(productId: number) {
    this.auth.updateBearer();
    this.http
      .delete<Cartitem>(
        environment.baseUrl + `/api/cart/removefromcart/${productId}`,
        {
          headers: environment.headers,
        }
      )
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe();
  }

  emptyCart(): void {
    this.auth.updateBearer();
    this.http
      .delete<Cartitem>(environment.baseUrl + `/api/cart/clear`, {
        headers: environment.headers,
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe();
  }
}
