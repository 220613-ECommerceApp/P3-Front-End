import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';
import { WishlistItem} from '../models/wishlist-item';
import { Product } from '../models/product';


describe('WishlistService', () => {
  let service: WishlistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WishlistService],
    });
    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to wishlist', () => {

    let product = {
      productId: 1
    }

    let productOne = new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url');
  
    spyOn(service, 'addToWishlist').and.callThrough();

    service.addToWishlist(product);
    expect(service.addToWishlist).toHaveBeenCalled();

    const req = httpMock.expectOne('http://localhost:8080/api/addToWishList');
    expect(req.request.method).toEqual('POST');
  })

  it('should remove product from wishlist', () => {


    let productOne = new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url');

    spyOn(service, 'removeFromWishlist').and.callThrough();

    service.removeFromWishlist(1);
    expect(service.removeFromWishlist).toHaveBeenCalled();

    const req = httpMock.expectOne('http://localhost:8080/api/removeFromWishList/1');

    expect(req.request.method).toEqual('DELETE');

  })

});
