import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from 'src/app/models/cartitem';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ErrorService } from 'src/app/services/error.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  alreadyInWishlist = new Map<number, boolean>();
  cartitems: Cartitem[] = [];
  totalPrice: number = 0;
  cartCount: number = 0;
  timer: any = 0;

  constructor(
    private router: Router,
    private cs: CartService,
    private ws: WishlistService
  ) {}

  ngOnInit(): void {
    this.cs.getCart().subscribe(
      (e) => {
        e.forEach((cartitem) => {
          this.cartitems.push(cartitem);
          this.totalPrice += cartitem.quantity * cartitem.product.price;
          this.cartCount += cartitem.quantity;
        });
      },
      (err) => {
        if (err.status == 401) this.router.navigate(['login']);
      }
    );
  }

  emptyCart(): void {
    this.cs.emptyCart();
    this.router.navigate(['/home']);
  }

  updateQuantity(inputId: string, stock: number, productId: number): void {
    let productName = '';
    let userQuantity: number = +(<HTMLInputElement>(
      document.getElementById(`${inputId}`)
    )).value;
    if (userQuantity < 0) {
      //Throw error
      ErrorService.displayWarning(true); // set the error state to true
      ErrorService.setMessage('Quantity must not be less than zero'); // set the error message
    } else if (userQuantity == 0) {
      ErrorService.displayWarning(false);
      this.cartitems.forEach((e, i, o) => {
        if (e.product.id == productId) {
          o.splice(i, 1);
          this.totalPrice -= e.quantity * e.product.price;
          this.cartCount -= e.quantity;
          productName = e.product.name;
        }
      });
      this.cs.removeItem(productId);
      ErrorService.displaySuccess(true); // set the success state to true
      ErrorService.setMessage(
        `Product:  [${productName.toUpperCase()}]  was removed from cart successfully`
      ); // set the success message
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
    } else if (userQuantity > stock) {
      //Throw error
      ErrorService.displayWarning(true); // set the error state to true
      ErrorService.setMessage('Quantity must not exceed inventory'); // set the error message
    } else {
      //Update
      ErrorService.displayWarning(false);
      this.cartitems.forEach((e, i, o) => {
        if (e.product.id == productId) {
          this.totalPrice += (userQuantity - e.quantity) * e.product.price;
          this.cartCount += userQuantity - e.quantity;
        }
      });
      this.cs.updateQuantity(userQuantity, productId);
      this.router.navigate(['cart']).then(() => {
        window.location.reload();
      });
    }
  }

  removeFromCart(productId: number): void {
    let productName: string = '';
    this.cartitems.forEach((e, i, o) => {
      if (e.product.id == productId) {
        o.splice(i, 1);
        this.totalPrice -= e.quantity * e.product.price;
        this.cartCount -= e.quantity;
        productName = e.product.name;
      }
    });
    this.cs.removeItem(productId);
    //timed success message
    ErrorService.displaySuccess(true); // set the success state to true
    ErrorService.setMessage(
      `Product:  [${productName.toUpperCase()}]  was removed from cart successfully`
    ); // set the success message
    clearTimeout(this.timer);
    this.timer = setTimeout(this.hideAlert, 2400);
  }

  removeFromCartAndAddToWishlist(productId: number) {
    if(this.alreadyInWishlist.get(productId)) {
      ErrorService.displayWarning(true);
      ErrorService.setMessage("Item is already in wishlist")
      clearTimeout(this.timer);
      this.timer = setTimeout(this.hideAlert, 2400);
      return;
    }
    this.ws.getWishlistItems().subscribe((data) => {
      let inWishlist: boolean = false;
      for(let item of data) {
        if(item.product.id == productId) {
          inWishlist = true;
          this.alreadyInWishlist.set(productId, inWishlist)
          break;
        }
      }
      if(!inWishlist) {
        this.removeFromCart(productId);
        this.ws.addToWishlist({ productId: productId });
        //timed success message
        ErrorService.displaySuccess(true); // set the success state to true
        ErrorService.setMessage(`Added to wishlist`); // set the success message
        clearTimeout(this.timer);
        this.timer = setTimeout(this.hideAlert, 2400);
      } else {
        ErrorService.displayWarning(true);
        ErrorService.setMessage("Item is already in wishlist")
        clearTimeout(this.timer);
        this.timer = setTimeout(this.hideAlert, 2400);
      }
    })
  }

  goTocheckout() {
    if (this.cartCount == 0) {
      //Throw error
      ErrorService.displayWarning(true); // set the error state to true
      ErrorService.setMessage('Add items to your cart first'); // set the error message
    } else {
      ErrorService.displayWarning(false);
      this.router.navigate(['/checkout']);
    }
  }
  hideAlert() {
    ErrorService.displaySuccess(false);
  }
}
