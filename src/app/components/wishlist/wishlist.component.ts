import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { CartService } from 'src/app/services/cart.service';
import { ErrorService } from 'src/app/services/error.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistCount: number = 0;
  wishlistItems: WishlistItem[] = [];
  timer: any = 0;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlistItems().subscribe(
      (wishlist) => {
        this.wishlistItems = wishlist;
        this.wishlistCount = wishlist.length;
      },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  removeFromWishlist(wishlistId: number) {
    this.wishlistService.removeFromWishlist(wishlistId);
    this.wishlistItems.forEach((e, i, o) => {
      if (e.id == wishlistId) {
        o.splice(i, 1);
        --this.wishlistCount;
      }
    });
    //timed success message
    ErrorService.displaySuccess(true); // set the success state to true
    ErrorService.setMessage('Removed from wishlist'); // set the success message
    clearTimeout(this.timer);
    this.timer = setTimeout(this.hideAlert, 2400);
  }

  removeFromWishlistAndAddToCart(wishlistId: number, productId: number) {
    this.removeFromWishlist(wishlistId);
    this.cartService.addToCart(productId, 1);
    //timed success message
    ErrorService.displaySuccess(true); // set the success state to true
    ErrorService.setMessage('Added to cart'); // set the success message
    clearTimeout(this.timer);
    this.timer = setTimeout(this.hideAlert, 2400);
  }
  hideAlert() {
    ErrorService.displaySuccess(false);
  }
}

