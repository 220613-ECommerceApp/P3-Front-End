import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartitem } from 'src/app/models/cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: Observable<Cartitem[]> = new Observable<Cartitem[]>();

  totalPrice!: number;
  cartCount!: number;

  constructor(private router: Router, private cs: CartService) {}

  ngOnInit(): void {
    this.cs.getCart();
    this.cartitems = this.cs.subject;
    this.cs.getTotalPrice().then((total) => (this.totalPrice = total));
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
      this.cs.removeItem(productId);
      location.reload();
    } else if(userQuantity>stock){
      //Throw Error
    } else{
      //Update
      this.cs.updateQuantity(userQuantity, productId);
      location.reload();
    }
  }

  removeFromCart(productId: number): void {
    this.cs.removeItem(productId);
    location.reload();
  }
}