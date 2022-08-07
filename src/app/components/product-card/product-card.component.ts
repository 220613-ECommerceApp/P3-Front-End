import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  
  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
     
  }

  addToCart(product: Product): void {
    //TO-DO
  }

  ngOnDestroy() {
     
  }

}
