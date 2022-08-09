import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderHistoryItem } from '../models/order-history-item';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

interface OrderHistory {
  orderHistoryItemCount: number;
  orderHistoryItems: OrderHistoryItem[][];
}  

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderHistoryUrl: string = "/api/orderHistory";
  
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

// TO DO: ORGANIZE SO IT WORKS WITH BACK END


  public getOrderHistoryItems(): Observable<OrderHistoryItem[][]> {
    this.auth.updateBearer()
    return this.http.get<OrderHistoryItem[][]>(environment.baseUrl+this.orderHistoryUrl, {headers: environment.headers});
  }

/*
  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+id);
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    this.auth.updateBearer()
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers})
  }
  */
}