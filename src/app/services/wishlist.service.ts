import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Wishlist } from '../models/wishlist';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';



interface WishlistInter {
  wishlistItems: Wishlist[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = "/api/addToWishList";

  private _wishlist = new BehaviorSubject<WishlistInter>({

    wishlistItems: [],
  })

  private _wishlist$ = this._wishlist.asObservable();

  getWishlist(): Observable<WishlistInter> {
    return this._wishlist$;
  }

  setWishlist(latestValue: WishlistInter) {
    return this._wishlist.next(latestValue);
  }

  constructor(private http: HttpClient, private auth: AuthService) { }

  // TO DO: ORGANIZE SO IT WORKS WITH BACK END


  public getWishlistItems(): Observable<Wishlist[]> {
    this.auth.updateBearer()
    return this.http.get<Wishlist[]>(environment.baseUrl + this.wishlistUrl, { headers: environment.headers });
  }
  removeItem(productId: number) {
    this.auth.updateBearer();
    this.http
      .delete<Wishlist>(
        environment.baseUrl + `/api/removeFromWishlist/${productId}`,
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

  emptyWishlist(): void {
    this.auth.updateBearer();
    this.http
      .delete<Wishlist>(environment.baseUrl + `/api/Wishlist/clear`, {
        headers: environment.headers,
      })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      )
      .subscribe();
  }


addToWishlist(ProductId: {productId: number})   {
  this.auth.updateBearer();
  this.http
    .post<{productId: number}>(
      environment.baseUrl + `/api/addToWishlist`,
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
// removeItem(productId: number) {
//   this.auth.updateBearer();
//   this.http
//     .delete<Wishlist>(
//       environment.baseUrl + `/api/cart/removefromcart/${productId}`,
//       {
//         headers: environment.headers,
//       }
//     )
//     .pipe(
//       catchError((e) => {
//         return throwError(e);
//       })
//     )
//     .subscribe();
// }

// removeItem(productId: number) {
//   this.auth.updateBearer();
//   this.http
//     .delete<Wishlist>(
//       environment.baseUrl + `/api/cart/removefromcart/${productId}`,
//       {
//         headers: environment.headers,
//       }
//     )
//     .pipe(
//       catchError((e) => {
//         return throwError(e);
//       })
//     )
//     .subscribe();
// }

// emptyWishlist(): void {
//   this.auth.updateBearer();
//   this.http
//     .delete<Wishlist>(environment.baseUrl + `/api/wishlist/clear`, {
//       headers: environment.headers,
//     })
//     .pipe(
//       catchError((e) => {
//         return throwError(e);
//       })
//     )
//     .subscribe();
// }

// function emptyWishlist() {
//   throw new Error('Function not implemented.');
// }

