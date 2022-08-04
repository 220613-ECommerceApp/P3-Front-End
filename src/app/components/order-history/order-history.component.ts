import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  products: {
    product: Product,
    quantity: number
  }[] = [];
  quantity!: number;
  price!: number;
  timestamp!: number;  

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
	    this.productService.getOrderHistory().subcribe(
      (orderHistory) => {
        this.products = orderHistory.products;
        this.products.forEach
          (element) => this.orderHistoryProducts.push(element.product)
        );
        this.timeStamps = orderHistory.timestamps;
      }
    );
  }


  emptyOrderHistory(): void {
    let orderHistory = {
	orderHistoryCount: 0,
	products: [],
	quanty: 0,
	price: 0,
    timeStamp: 0
    };
    
    
    this.productService.setOrderHistory(orderHistory);
    this.router.navigate(['/home']);
  }

}



