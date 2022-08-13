import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WishlistItem } from '../models/wishlist-item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getWishlistItems(): Observable<WishlistItem[]>{
    this.auth.updateBearer()
    return this.http.get<WishlistItem[]>(environment.baseUrl + `/api/getWishList`, {headers: environment.headers});
  }

  addToWishlist(ProductId: {productId: number}){
    this.auth.updateBearer();
    this.http
    .post<{productId: number}>(
      environment.baseUrl + `/api/addToWishList`,
      JSON.stringify(ProductId),
      {
        headers: new HttpHeaders({
          Authorization: environment.headers.Authorization,
          'Content-Type': environment.headers['Content-Type'],
        }),
      }
    )
    .pipe(
      catchError((e) => {
        return throwError(e);
      })
    ).subscribe();
  }
}
