import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Cartitem } from 'src/app/models/cartitem';
import { environment } from 'src/environments/environment';
import { Wishlist } from 'src/app/models/wishlist';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;
  
  addedToWishlist: boolean = false;

  constructor(
    private cartservice: CartService,
    private http: HttpClient,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
  }

  async addToCart(product: Product): Promise<any> {
    let inCart = false;
    let currentQuantity=0;
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
        this.cartservice.updateQuantity(currentQuantity+1, product.id);      
    } else {
     this.cartservice.addToCart(product.id, 1);
    }
    // location.reload();
  }


  

  async addToWishlist(product: Product): Promise<any> {
    let data = await this.http
      .get<Wishlist[]>(environment.baseUrl + '/api/wishlist', {
        headers: environment.headers,
      })
      .toPromise();
      this.wishlistService.addToWishlist({productId: product.id}
        )
            
      }

      
    
  }

// }
// handleAddToWishlist(){
//   this.wishlistService.addProductToCart(this.productItem).subscribe(() => {
//     this.msg.sendMsg(this.productItem)
//   })
// }
// handleAddToWishlist(){
//   this.wishlistService.addToWishlist(this.productItem.id).subscribe(() => {
//     this.addedToWishlist = true;

//   })
// }

// handleRemoveFromWishlist(){
//   this.wishlistService.removeFromWishlist(this.productItem.id).subscribe(() =>{
//     this.addedToWishlist = false;
//   })

// }

// function handleAddToWishlist() {
//   throw new Error('Function not implemented.');
// }


function handleRemoveFromWishlist() {
  throw new Error('Function not implemented.');
}
