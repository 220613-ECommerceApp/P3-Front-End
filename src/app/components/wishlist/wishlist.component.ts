import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.wishlistService.getWishlistItems().subscribe(
      (wishlist) => {
        this.wishlistItems = wishlist;
      },
      (err) => {
				if(err.status == 401) {
					this.router.navigate(["login"])
				}
			}
    );
  }

  removeFromWishlist(wishlistId: number){
    this.wishlistService.removeFromWishlist(wishlistId);
    this.wishlistItems.forEach((e,i,o) => {
      if(e.id == wishlistId){
        o.splice(i,1);
      }
    });
  }

  removeFromWishlistAndAddToCart(wishlistId: number, productId: number){
    this.removeFromWishlist(wishlistId);
    this.cartService.addToCart(productId, 1);
  }
}

