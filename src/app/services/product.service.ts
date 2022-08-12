import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string = '/api/product';

  constructor(private http: HttpClient, private auth: AuthService) {}

  public getProducts(): Observable<Product[]> {
    this.auth.updateBearer();
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, {
      headers: environment.headers,
    });
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      environment.baseUrl + this.productUrl + '/' + id
    );
  }

  public purchase(
    products: { id: number; quantity: number }[]
  ): Observable<any> {
    this.auth.updateBearer();
    const payload = JSON.stringify(products);
    return this.http.patch<any>(
      environment.baseUrl + this.productUrl,
      payload,
      { headers: environment.headers }
    );
  }
}
