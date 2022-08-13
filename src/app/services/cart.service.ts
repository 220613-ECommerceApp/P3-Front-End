import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartitem } from '../models/cartitem';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { ProductCount } from '../interfaces/product-count';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartCountUpdated = new Subject<number>();
  cartProducts: ProductCount[] = [];
  cartCount: number = 0;
  cartCountChanged$ = this.cartCountUpdated.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {}

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

  private updateCartProducts(id: number, count: number): void {
    let totalCount = 0;
    this.cartProducts = this.cartProducts.map((product) => {
      if (product.id === id) {
        product.count = count;
      }
      totalCount += product.count;
      return product;
    });
    this.setCount(totalCount);
  }

  private deleteCartProduct(id: number) {
    this.cartProducts = this.cartProducts.filter((product) => {
      if (product.id === id) {
        return false;
      } else {
        return true;
      }
    });
    this.setCount(this.getTotalCount());
  }

  private getTotalCount(): number {
    let totalCount = 0;
    this.cartProducts.forEach((product) => {
      totalCount += product.count;
    });
    return totalCount;
  }

  addToCartProduct(id: number, count: number): void {
    const product: ProductCount = { id: id, count: count };
    let hasProduct: boolean = this.cartProducts.some((item) => item.id === id);
    if (!hasProduct) {
      this.cartProducts.push(product);
      this.setCount(this.getTotalCount());
    }
  }

  setCount(count: number) {
    this.cartCount = count;
    this.cartCountUpdated.next(this.cartCount);
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
    this.cartCount = count;
    return count;
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
      .subscribe(() => {
        this.updateCartProducts(productId, newQuantity);
      });
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
      )
      .subscribe(() => {
        this.addToCartProduct(productId, quantity);
      });
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
      .subscribe(() => {
        this.deleteCartProduct(productId);
      });
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
      .subscribe(() => {
        this.setCount(0);
      });
  }
}
