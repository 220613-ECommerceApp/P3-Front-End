import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Cartitem } from 'src/app/models/cartitem';
import { environment } from 'src/environments/environment';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;

  public isProductCard: boolean;
  public buyQuantity: number;

  public showElement?: boolean;
  public cartCount: number = 0;
  public inCartDisplayDiv: boolean = false;
  timer: any = 0;

  constructor(
    private cartservice: CartService,
    private wishlistservice: WishlistService,
    private http: HttpClient,
    private router: Router
  ) {
    this.isProductCard = true;
    this.buyQuantity = 1;
  }

  ngOnInit(): void {
    if (!this.cartservice.isLoggedIn()) return;
    this.fetchCurrentCount();
  }
  async fetchCurrentCount() {
    console.log('I ran, hooray!');
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

  async addToCart(product: Product, quantity: number): Promise<any> {
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
      if (e.status == 401) {
        this.router.navigate(['login']);
        return;
      }
    }
    if (
      currentQuantity >= product.quantity ||
      currentQuantity + quantity > product.quantity
    ) {
      //timed warning message
      ErrorService.displayWarning(true); // set the success state to true
      ErrorService.setMessage(
        'Failed! Stock limit reached'
      ); // set the success message
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
      return;
    }
    if (inCart) {
      this.cartservice.updateQuantity(currentQuantity + quantity, product.id);
      //timed success message
      ErrorService.displaySuccess(true); // set the success state to true
      ErrorService.setMessage(
        `Product:  [${product.name.toUpperCase()}]  added to cart`
      ); // set the success message
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
    } else {
      this.cartservice.addToCart(product.id, quantity);
      this.inCartDisplayDiv = true;
      //timed success message
      ErrorService.displaySuccess(true); // set the success state to true
      ErrorService.setMessage(
        `Product:  [${product.name.toUpperCase()}]  added to cart`
      ); // set the success message
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
    }
    this.cartCount += quantity;
    this.changeCard();
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
      if (e.status == 401) {
        this.router.navigate(['login']);
        return;
      }
    }
    if (!inWishList) {
      //timed success message
      ErrorService.displaySuccess(true); // set the success state to true
      ErrorService.setMessage(
        `Product:  [${product.name.toUpperCase()}]  added to wishlist`
      ); // set the success message
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
      this.wishlistservice.addToWishlist({ productId: product.id });
    }
    this.changeCard();
  }

  ngOnDestroy() {}

  changeCard() {
    this.isProductCard = !this.isProductCard;
  }

  checkInputQty(event: any): void {
    const num: number = event.target.value;
    if (!num) {
      event.target.value = 1;
    } else if (num > this.productInfo.quantity) {
      event.target.value = this.productInfo.quantity;
    }
  }

  hideAlert() {
    ErrorService.displaySuccess(false);
    ErrorService.displayWarning(false);
  }
}
