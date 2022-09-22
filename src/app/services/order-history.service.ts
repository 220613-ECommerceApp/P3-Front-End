import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { OrderHistoryItem } from '../models/order-history-item';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';

interface OrderHistory {
  orderHistoryItemCount: number;
  orderHistoryItems: OrderHistoryItem[][];
}  

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private orderHistoryUrl: string = `/api/orderHistory`;
  
  private _orderHistory = new BehaviorSubject<OrderHistory>({
	orderHistoryItemCount: 0,
	orderHistoryItems: [],
})

  private _orderHistory$ = this._orderHistory.asObservable();
  
  getOrderHistory(): Observable<OrderHistory> {
    return this._orderHistory$;
  }
  
  setOrderHistory(latestValue: OrderHistory) {
    return this._orderHistory.next(latestValue);
  }	
	
  constructor(private http: HttpClient, private auth: AuthService) { }


  public getOrderHistoryItems(): Observable<OrderHistoryItem[][]> {
    this.auth.updateBearer()
    return this.http.get<OrderHistoryItem[][]>(environment.baseUrl+this.orderHistoryUrl, {headers: environment.headers});
  }
  
  public addItemsToOrderHistory(productsDTO: {id: number, quantity: number}[]) {
    this.auth.updateBearer()
    this.http
    .post<{id: number, quantity: number}[]>(
      environment.baseUrl + this.orderHistoryUrl,
      JSON.stringify(productsDTO),
      {
        headers: new HttpHeaders({
          Authorization: environment.headers.Authorization,
          'Content-Type': environment.headers['Content-Type'],
        }),
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe();
  }

}