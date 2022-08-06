import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartitem } from 'src/app/models/cartitem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {


cartitems:Observable<Cartitem[]> = new Observable<Cartitem[]>();





  // products: {
  //   product: Product;
  //   quantity: number;
  // }[] = [];

  totalPrice!: number;

  // cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private cs: CartService) {}

  ngOnInit(): void {
    // this.productService.getCart().subscribe((cart) => {
    //   this.products = cart.products;
    //   this.products.forEach((element) =>
    //     this.cartProducts.push(element.product)
    //   );
    //   this.totalPrice = cart.totalPrice;
    // });
this.cs.getCart();
this.cartitems = this.cs.subject;
// console.log(this.cartitems);
this.getTotalPrice();
  }

  emptyCart(): void {
    // let cart = {
    //   cartCount: 0,
    //   products: [],
    //   totalPrice: 0.0,
    // };
    // this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  // Testing functionality for adding and removing from the cart
  increaseQuantity(): void {
    console.log('Increasing Quantity');
  }

  decreaseQuantity(): void {
    console.log('Increasing Quantity');
  }

  getTotalPrice():void {
    this.totalPrice =0;
    this.cartitems.forEach(e=>{
       e.forEach(r=>{
         this.totalPrice += r.quantity * r.product.price;
        
       })
    })


  }


}
