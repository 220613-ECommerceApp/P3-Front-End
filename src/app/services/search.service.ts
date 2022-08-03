import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private productUrl: string = '/api/product/search/description/';

  products: Product[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  public getProducts(query: string): void {
    let searchUrl: string = environment.baseUrl + this.productUrl + query;
    this.auth.updateBearer();
    this.http
      .get<Product[]>(searchUrl, {
        headers: environment.headers,
      })
      .subscribe(
        (resp) => (this.products = resp),
        (err) => console.log(err),
        () => console.log('Products Retrieved')
      );
  }
}
