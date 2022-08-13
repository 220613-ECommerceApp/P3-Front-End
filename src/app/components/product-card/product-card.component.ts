import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Cartitem } from 'src/app/models/cartitem';
import { environment } from 'src/environments/environment';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;

  public showElement?: boolean;

  constructor(private cartservice: CartService, private wishlistservice: WishlistService,private http: HttpClient) {}

  ngOnInit(): void {}

  async addToCart(product: Product): Promise<any> {
    let inCart = false;
    let currentQuantity = 0;
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
    if (inCart) {
      this.cartservice.updateQuantity(currentQuantity + 1, product.id);
    } else {
      this.cartservice.addToCart(product.id, 1);
    }
  }

  async addToWishlist(product: Product): Promise<any> {
    let inWishList = false;
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

      if (!inWishList){
        this.wishlistservice.addToWishlist({productId: product.id})
      }
  }

  ngOnDestroy() {}
}
