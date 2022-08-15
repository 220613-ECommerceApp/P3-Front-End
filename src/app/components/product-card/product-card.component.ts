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

  public isProductCard: boolean;
  public buyQuantity: number;

  public showElement?: boolean;
  public cartCount: number = 0;
  public inCartDisplayDiv: boolean = false;

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
    if(!this.cartservice.isLoggedIn()) return;
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
      currentQuantity+ quantity > product.quantity
    ) {
      console.log('STOP'); //Stock is not enough
      return;
    }
    if (inCart) {
      this.cartservice.updateQuantity(currentQuantity + quantity, product.id);
    } else {
      this.cartservice.addToCart(product.id, quantity);
      this.inCartDisplayDiv = true;
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
      this.wishlistservice.addToWishlist({ productId: product.id });
    }
    this.changeCard();
  }

  ngOnDestroy() {}

  changeCard() {
    this.isProductCard = !this.isProductCard;
  }

  enlargeImage() {
    let modal = document.getElementById("theModal");
    let img = document.getElementById(this.productInfo.name) as HTMLImageElement;
    let modalImg = document.getElementById("modImage") as HTMLImageElement;
    let captionText = document.getElementById("caption");
    console.log("I was clicked on!")
    if(img == null || modal == null || modalImg == null || captionText == null) return;
    modal.style.display = "block";
    modalImg.src = img.src;
    //captionText.innerHTML = img.alt;
    //modalImg.onclick = function() {
    //  if(modal == null) return;
    // modal.style.display="none";
    //}
  }

  checkInputQty(event: any): void {
    const num: number = event.target.value;
    if (!num) {
      event.target.value = 1;
    } else if (num > this.productInfo.quantity) {
      event.target.value = this.productInfo.quantity;
    }
  }
}
