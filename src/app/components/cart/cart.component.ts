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

  updateQuantity(event: Event): void {
    let elementId: string = (event.target as Element).id;
    let id: number = +elementId.split(',')[0];
    let stock: number = +elementId.split(',')[3];
    
    console.log(id,stock)
     

    //update
  }

  removeFromCart(event: Event): void {
    let elementId: string = (event.target as Element).id;
    let id: number = +elementId.split(',')[0];
    this.cs.removeItem(id);
    location.reload();
  }
}