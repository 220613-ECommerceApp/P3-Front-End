import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { Product } from '../models/product';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  


  it('should set products array to be equal to all the products found and print out "Products Retrieved"', () => {

    let spy = spyOn(service, 'findProducts');

    let productOne = new Product(1, 'Headphones', 10, 'A nice pair of headphones', 20.0, 'https://i.insider.com/54eb437f6bb3f7697f85da71?width=1000&format=jpeg&auto=webp');
    let productTwo = new Product(2, 'actualVideogame', 20, 'bryans videogame', 70.00, 'vidya url');
    service.findProducts('Headphones');
    expect(service.findProducts).toHaveBeenCalled();
    expect(service.products[0]).toEqual(productOne);


    const req = httpMock.expectOne('localhost:8080/api/product/search/superSearch?query=Headphones');

    expect(req.request.method).toEqual('GET');


  })



});
