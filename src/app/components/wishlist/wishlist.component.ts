
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wishlist } from 'src/app/models/wishlist';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistItems : Wishlist[] = [];
  constructor(private wishlistService: WishlistService, private router: Router) { }
  ngOnInit(): void {
		this.wishlistService.getWishlistItems().subscribe(
      		(wishlist) => {
        		wishlist.forEach(
					(element) => this.wishlistItems.push(element)
				);
      		}
    	);
  }
}






