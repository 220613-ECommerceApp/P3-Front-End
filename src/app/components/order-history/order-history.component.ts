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
	    		//this.orderHistoryItemCount = orderHistory.length;
        		//this.orderHistoryItems = orderHistory.orderHistoryItems;
        	
        		this.orderHistoryItems = orderHistory;
        
        		//orderHistory.forEach(
				//	(element) => this.orderHistoryItems.push(element)
				//);
		
      		}
    	);
  }
  
  printPurchaseDate(item : OrderHistoryItem): string  {
		return item.timestamp.getMonth + "/" + item.timestamp.getDay + "/" + item.timestamp.getFullYear;
	}
	
  getTotalPrice(item : OrderHistoryItem): string {
	return (item.quantity  * item.product.price) + "";
	}
}