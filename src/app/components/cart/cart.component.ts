import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartitem } from 'src/app/models/cartitem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: Observable<Cartitem[]> = new Observable<Cartitem[]>();


  totalPrice!: number;
  cartCount!: number;


  constructor(
     private router: Router
    ,
    private cs: CartService
  ) {}

  ngOnInit(): void {
    

    this.cs.getCart();
    this.cartitems = this.cs.subject;
    this.getTotalPrice();
    
   
    

  }

  emptyCart(): void {
     //TO-DO
    this.router.navigate(['/home']);
  }

  // Testing functionality for adding and removing from the cart
  increaseQuantity(): void {
    console.log('Increasing Quantity');
  }

  decreaseQuantity(): void {
    console.log('Decrease Quantity');
  }

  getTotalPrice(): void {
    this.totalPrice = 0;
    this.cartitems.forEach((e) => {
      e.forEach((r) => {
        this.totalPrice += r.quantity * r.product.price;
      });
    });
  }
 
}
