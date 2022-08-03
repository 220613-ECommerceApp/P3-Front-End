import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  getProducts(): Product[] {
    return this.searchService.products;
  }
}
