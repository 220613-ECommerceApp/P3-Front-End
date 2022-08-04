import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

interface OrderHistory {
  orderHistoryCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  quantity: number;
  price: number;
  timeStamp: number;
}  

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    products: [],
    totalPrice: 0.00
  });
  
  private _orderHistory = new BehaviorSubject<OrderHistory>({
	orderHistoryCount: 0,
	products: [],
	quantity: 0,
	price: 0,
    timeStamp: 0
})

  private _cart$ = this._cart.asObservable();
  private _orderHistory$ = this._orderHistory.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$;
  }
  
  getOrderHistory(): Observable<OrderHistory> {
    return this._orderHistory$;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }
  
  setOrderHistory(latestValue: OrderHistory) {
    return this._orderHistory.next(latestValue);
  }	
	
  constructor(private http: HttpClient, private auth: AuthService) { }

  public getProducts(): Observable<Product[]> {
    this.auth.updateBearer()
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers});
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+id);
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    this.auth.updateBearer()
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers})
  }
}