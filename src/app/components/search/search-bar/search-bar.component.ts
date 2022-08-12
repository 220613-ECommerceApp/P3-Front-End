import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tag } from 'src/app/models/tag';
import { SearchQuery } from 'src/app/interfaces/search-query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
  selectedOption: string = 'all';
  faSearch = faSearch;

  search: SearchQuery = { query: ' ' };

  tags: Tag[] = [];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.searchService.getTags().subscribe(
      (resp) => (this.tags = resp),
      (err) => console.log(err),
      () => console.log('Tags Retrieved')
    );
  }

  searchClicked(): void {
    let tagName =
      this.selectedOption === 'all' ? undefined : this.selectedOption;
    this.search.tagName = tagName;
    this.search.query = this.searchQuery === '' ? ' ' : this.searchQuery.trim();
    this.searchService.findProducts(
      this.search.query,
      undefined,
      undefined,
      this.search.tagName
    );
    this.searchService.searchString = this.search.query;
    this.router.navigate(['/search']);
  }
}
