import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
  faSearch = faSearch;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {}

  searchClicked(): void {
    console.log('Useless search bar input: ' + this.searchQuery);
    this.searchService.getProducts(this.searchQuery);
    this.router.navigate(['/search']);
  }
}
