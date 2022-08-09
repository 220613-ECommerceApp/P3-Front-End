import { Component, OnInit } from '@angular/core';
import { SearchQuery } from 'src/app/interfaces/search-query';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.getProducts(' ').subscribe(
      (resp) => (this.allProducts = resp),
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );
  }

  ngOnChanges(): void {
    console.log();
  }

  getProducts(): Product[] {
    return this.searchService.products;
  }

  searchHandler(search: SearchQuery): void {
    this.searchService
      .getProducts(search.query, undefined, undefined, search.tagName)
      .subscribe(
        (resp) => (this.allProducts = resp),
        (err) => console.log(err),
        () => console.log('Products Retrieved')
      );
  }
}
