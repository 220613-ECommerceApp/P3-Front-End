import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => (this.allProducts = resp),
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );
  }

  // searchHandler(search: SearchQuery): void {
  //   this.searchService
  //     .getProducts(search.query, undefined, undefined, search.tagName)
  //     .subscribe(
  //       (resp) => (this.allProducts = resp),
  //       (err) => console.log(err),
  //       () => console.log('Products Retrieved')
  //     );
  // }
}
