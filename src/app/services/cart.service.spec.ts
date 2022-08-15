import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the cart quantity', () => {
    spyOn(service, 'updateQuantity').and.callThrough();

    service.updateQuantity(12, 1);

    expect(service.updateQuantity).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8080/api/cart/updatecart/1'
    );

    req.flush('');
    expect(req.request.method).toEqual('PUT');
  });

  it('should add item to cart', () => {
    spyOn(service, 'addToCart').and.callThrough();

    service.addToCart(1, 12);

    expect(service.addToCart).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8080/api/cart/addtocart/1'
    );

    req.flush('');
    expect(req.request.method).toEqual('POST');
  });

  it('should remove item from cart', () => {
    spyOn(service, 'removeItem').and.callThrough();

    service.removeItem(12);

    expect(service.removeItem).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8080/api/cart/removefromcart/12'
    );

    req.flush('');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should empty cart', () => {
    spyOn(service, 'emptyCart').and.callThrough();

    service.emptyCart();

    expect(service.emptyCart).toHaveBeenCalled();

    const req = httpMock.expectOne('http://localhost:8080/api/cart/clear');

    req.flush('');
    expect(req.request.method).toEqual('DELETE');
  });
});
