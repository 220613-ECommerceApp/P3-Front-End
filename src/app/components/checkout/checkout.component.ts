import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Cartitem } from 'src/app/models/cartitem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    cardName: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    addOne: new FormControl('', Validators.required),
    addTwo: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  cartitems: Cartitem[] = [];
  totalPrice: number = 0;
  cartCount: number = 0;

  productsDTO: {
    id: number;
    quantity: number;
  }[] = [];

  productsObject: {
    product: Product;
    quantity: number;
  }[] = [];

  constructor(
    private ps: ProductService,
    private router: Router,
    private cs: CartService,
    private ohs: OrderHistoryService
  ) {}

  ngOnInit(): void {
    this.cs.getCart().subscribe((e) => {
      e.forEach((cartitem) => {
        this.cartitems.push(cartitem);
        this.totalPrice += cartitem.quantity * cartitem.product.price;
        this.cartCount += cartitem.quantity;
        this.productsObject.push({
          product: cartitem.product,
          quantity: cartitem.quantity,
        });
        this.productsDTO.push({
          id: cartitem.product.id,
          quantity: cartitem.quantity,
        });
      })
    },
    (err) => {
      if(err.status == 401) {
        this.router.navigate(["login"])
      }
    });
  }

  onSubmit(): void {

    if(this.cartCount<1){
      //don't checkout. Add items to cart first
    }else{
      //update quantities for each product
      this.ps.purchase(this.productsDTO).subscribe();

      //clearing the cart
      this.cs.emptyCart();
      this.ohs.addItemsToOrderHistory(this.productsDTO);
      this.router.navigate(['/home']);
    }
 }
}
