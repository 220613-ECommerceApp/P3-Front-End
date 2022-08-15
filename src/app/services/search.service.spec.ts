import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { Tag } from '../models/tag';

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set products array to be equal to all the products found and print out "Products Retrieved"', () => {
    spyOn(service, 'findProducts').and.callThrough();
    spyOn(window.console, 'log');

    service.findProducts('Headphones');

    expect(service.findProducts).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8080/api/product/search/superSearch?query=Headphones'
    );

    req.flush('');
    expect(req.request.method).toEqual('GET');
    expect(window.console.log).toHaveBeenCalledWith('Products Retrieved');
  });

  it('should return tags', (done) => {
    let tags = [new Tag('bryan')];

    service.getTags().subscribe((response) => {
      expect(response).toEqual(tags);
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tag');

    expect(req.request.method).toEqual('GET');
    req.flush(tags);
  });

  it('should print error if findProducts fails for some reason', () => {
    spyOn(service, 'findProducts').and.callThrough();
    spyOn(window.console, 'log');

    service.findProducts('Headphones');

    expect(service.findProducts).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8080/api/product/search/superSearch?query=Headphones'
    );

    req.flush('You Died', { status: 500, statusText: 'Internal Server Error' });
    expect(req.request.method).toEqual('GET');
    expect(window.console.log).toHaveBeenCalled();
  });
});
