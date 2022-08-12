import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishlistItem } from '../models/wishlist-item';
import { AuthService } from './auth.service';

interface Wishlist{
  wishlistItems: WishlistItem[];
}

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  private getWishlistUrl: string = `/api/getWishList`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getWishlistItems(): Observable<WishlistItem[]>{
    this.auth.updateBearer()
    return this.http.get<WishlistItem[]>(environment.baseUrl + this.getWishlistUrl, {headers: environment.headers});
  }
}
