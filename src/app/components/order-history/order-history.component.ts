import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistoryItem } from 'src/app/models/order-history-item';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryItemCount!: number;
  orderHistoryItems : OrderHistoryItem[][] = [[]];

  constructor(private orderHistoryService: OrderHistoryService, private router: Router) { }

  ngOnInit(): void {
		this.orderHistoryService.getOrderHistoryItems().subscribe(
      		(orderHistory) => {
        		orderHistory.forEach(
					(element) => this.orderHistoryItems.push(element)
				);
      		},
			(err) => {
				if(err.status == 401) {
					this.router.navigate(["login"])
				}
			}
    	);
  }
  
  printPurchaseDate(item : OrderHistoryItem): string  {
	let ts = new Date(item.timestamp.split("+")[0])
	return ts.toUTCString();
	}
	
  getTotalPrice(item : OrderHistoryItem): string {
		return (item.quantity  * item.product.price) + "";
	}
}