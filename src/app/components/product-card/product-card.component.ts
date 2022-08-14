import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Cartitem } from 'src/app/models/cartitem';
import { environment } from 'src/environments/environment';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;

  public showElement?: boolean;
  public cartCount: number = 0;
  public inCartDisplayDiv: boolean = false;

  constructor(private cartservice: CartService, private wishlistservice: WishlistService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentCount();
  }

  async fetchCurrentCount(){
     this.inCartDisplayDiv = false;
    try {
      let data = await this.http
        .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
          headers: environment.headers,
        })
        .toPromise();
      data.forEach((p) => {
        if (this.productInfo.id == p.product.id) {
          this.inCartDisplayDiv = true;
          this.cartCount = p.quantity;
        }
      });
    } catch (e: any) {
      if (e.status == 401) {
        this.router.navigate(['login']);
        return;
      }
    }
  }

  async addToCart(product: Product): Promise<any> {
    let inCart = false;
    let currentQuantity = 0;
    try {
      let data = await this.http
        .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
          headers: environment.headers,
        })
        .toPromise();
        data.forEach((p) => {
          if (product.id == p.product.id) {
            inCart = true;
            currentQuantity = p.quantity;
           
            }
        });
    } catch (e: any) {
      if(e.status == 401) {
        this.router.navigate(["login"])
        return
      }
    }
    if (currentQuantity >= product.quantity){
      console.log("STOP") //Stock is not enough
      return;
    }
    if (inCart) {
      this.cartservice.updateQuantity(currentQuantity + 1, product.id);
      this.cartCount++;
    } else {
      this.cartservice.addToCart(product.id, 1);
      this.cartCount++;
      this.inCartDisplayDiv = true;
    }
  }

  async addToWishlist(product: Product): Promise<any> {
    let inWishList = false;
    try {
      let data = await this.http
        .get<WishlistItem[]>(environment.baseUrl + '/api/getWishList', {
          headers: environment.headers,
        })
        .toPromise();
        data.forEach((p) => {
          if (product.id == p.product.id) {
            inWishList = true;
          }
        });        
      } catch (e: any) {
        if(e.status == 401) {
          this.router.navigate(["login"])
          return
        }
      }
      if (!inWishList){
        this.wishlistservice.addToWishlist({productId: product.id})
      }
  }

  ngOnDestroy() {}
}
