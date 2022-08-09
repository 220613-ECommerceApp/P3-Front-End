import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from 'src/app/models/cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  
  cartitems: Cartitem[] = [];
  totalPrice: number = 0;
  cartCount: number = 0;

  constructor(private router: Router, private cs: CartService) {}

  ngOnInit(): void {
    this.cs.getCart().subscribe((e) => e.forEach(cartitem=>{
      this.cartitems.push(cartitem);
      this.totalPrice += cartitem.quantity * cartitem.product.price;
      this.cartCount +=cartitem.quantity;
    }));
  }

  emptyCart(): void {
    this.cs.emptyCart();
    this.router.navigate(['/home']);
  }

  updateQuantity(inputId: string, stock:number, productId:number): void {
    let userQuantity: number = +(<HTMLInputElement>document.getElementById(`${inputId}`)).value;
    if(userQuantity<0){
      //Throw Error
    }else if(userQuantity==0){
      this.cartitems.forEach((e, i, o) => {
        if (e.product.id == productId) {
          o.splice(i, 1);
          this.totalPrice -= e.quantity * e.product.price;
          this.cartCount -= e.quantity;
        }
      });
      this.cs.removeItem(productId);
    } else if(userQuantity>stock){
      //Throw Error
    } else{
      //Update
       this.cartitems.forEach((e, i, o) => {
        if (e.product.id == productId) {
          this.totalPrice += ((userQuantity - e.quantity) * e.product.price);
          this.cartCount += (userQuantity - e.quantity);
        }
      });
      this.cs.updateQuantity(userQuantity, productId);
    }
  }

  removeFromCart(productId: number): void {
    this.cartitems.forEach((e,i,o)=>{
      if(e.product.id==productId){
          o.splice(i,1);
          this.totalPrice -= e.quantity*e.product.price;
          this.cartCount -= e.quantity;
      }
    })
    this.cs.removeItem(productId);
  }
}