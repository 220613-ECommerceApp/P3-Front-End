import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchQuery } from 'src/app/interfaces/search-query';
import { SearchService } from 'src/app/services/search.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css'],
})
export class FilterSearchComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 0;

  search: SearchQuery = { query: ' ' };

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.minPrice = this.searchService.minPrice;
    this.maxPrice = this.searchService.minPrice;
  }

  private isValidInput(): boolean {
    if (this.minPrice === null || this.maxPrice === null) {
      ErrorService.displayWarning(true);
      ErrorService.setMessage("Min price and max price can't be empty");
      return false;
    }

    if (this.minPrice > this.maxPrice) {
      ErrorService.displayWarning(true);
      ErrorService.setMessage("Min price can't be greater than max price");
      return false;
    }
    return true;
  }

  filterClicked(): void {
    let tagName = this.searchService.searchTag;
    this.search.tagName = tagName;
    this.search.query = this.searchService.searchString;
    this.search.startPrice = this.minPrice;
    this.search.endPrice = this.maxPrice;
    if (!this.isValidInput()) {
      return;
    }
    this.searchService.findProducts(
      this.search.query,
      this.search.startPrice,
      this.search.endPrice,
      this.search.tagName
    );
    this.searchService.minPrice = this.minPrice;
    this.searchService.maxPrice = this.maxPrice;
    this.router.navigate(['/search']);
  }
}
