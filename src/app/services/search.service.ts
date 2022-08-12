import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { AuthService } from './auth.service';
import { Tag } from '../models/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private productUrl: string = '/api/product/search/superSearch';
  private tagUrl: string = '/api/tag';

  products: Product[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  // public getProducts(
  //   searchQuery: string,
  //   startPrice?: number,
  //   endPrice?: number,
  //   tagName?: string
  // ): Observable<Product[]> {
  //   let queryParams = new HttpParams();

  //   if (typeof startPrice !== 'undefined') {
  //     queryParams = queryParams.append('startPrice', startPrice);
  //   }

  //   if (typeof endPrice !== 'undefined') {
  //     queryParams = queryParams.append('endPrice', endPrice);
  //   }

  //   if (typeof tagName !== 'undefined') {
  //     queryParams = queryParams.append('tagName', tagName);
  //   }

  //   queryParams = queryParams.append('query', searchQuery);

  //   let searchUrl: string = environment.baseUrl + this.productUrl;
  //   this.auth.updateBearer();
  //   return this.http.get<Product[]>(searchUrl, {
  //     headers: environment.headers,
  //     params: queryParams,
  //   });
  // }

  public findProducts(
    searchQuery: string,
    startPrice?: number,
    endPrice?: number,
    tagName?: string
  ): void {
    let queryParams = new HttpParams();

    if (typeof startPrice !== 'undefined') {
      queryParams = queryParams.append('startPrice', startPrice);
    }

    if (typeof endPrice !== 'undefined') {
      queryParams = queryParams.append('endPrice', endPrice);
    }

    if (typeof tagName !== 'undefined') {
      queryParams = queryParams.append('tagName', tagName);
    }

    queryParams = queryParams.append('query', searchQuery);

    this.findProductsHttp(queryParams).subscribe(
      (resp) => (this.products = resp),
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );
  }

  private findProductsHttp(queryParams: HttpParams): Observable<Product[]> {
    let searchUrl: string = environment.baseUrl + this.productUrl;
    this.auth.updateBearer();
    return this.http.get<Product[]>(searchUrl, {
      headers: environment.headers,
      params: queryParams,
    });
  }

  public getTags(): Observable<Tag[]> {
    let getTagUrl: string = environment.baseUrl + this.tagUrl;
    this.auth.updateBearer();
    return this.http.get<Tag[]>(getTagUrl, {
      headers: environment.headers,
    });
  }
}
