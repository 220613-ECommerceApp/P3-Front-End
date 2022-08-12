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

    spyOn(service, 'findProducts').and.callThrough();

    let productOne = new Product(1, 'Headphones', 10, 'A nice pair of headphones', 20.0, 'https://i.insider.com/54eb437f6bb3f7697f85da71?width=1000&format=jpeg&auto=webp');
    //let productTwo = new Product(2, 'actualVideogame', 20, 'bryans videogame', 70.00, 'vidya url');

    service.findProducts('Headphones')
    
    expect(service.findProducts).toHaveBeenCalled();
    expect(service.products[0]).toBeTruthy(productOne);


    const req = httpMock.expectOne('http://localhost:8080/api/product/search/superSearch?query=Headphones');

    expect(req.request.method).toEqual('GET');


  })


  it('should return tags', () => {

    

    //let productOne = new Product(1, 'Headphones', 10, 'A nice pair of headphones', 20.0, 'https://i.insider.com/54eb437f6bb3f7697f85da71?width=1000&format=jpeg&auto=webp');
    let productTwo = new Product(4, 'Baseball Cap', 20, 'A fancy cap for a fancy person', 10.00, 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png');

    service.getTags().subscribe((response) => {
      expect(response[0]).toBe(productTwo);
    });
    


    const req = httpMock.expectOne('http://localhost:8080/api/tag');

    expect(req.request.method).toEqual('GET');


  })

});
