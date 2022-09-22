import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrderHistoryService } from './order-history.service';

describe('OrderHistoryService', () => {
  let service: OrderHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrderHistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add items to order history', () => {
    const productsDTO = [
      { id: 1, quantity: 20 },
      { id: 6, quantity: 1 },
    ];

    spyOn(service, 'addItemsToOrderHistory').and.callThrough();

    service.addItemsToOrderHistory(productsDTO);

    expect(service.addItemsToOrderHistory).toHaveBeenCalled();

    const req = httpMock.expectOne('http://localhost:8080/api/orderHistory');

    req.flush('');
    expect(req.request.method).toEqual('POST');
  });

  it('should get order history', (done) => {
    service.getOrderHistory().subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });
  });
});
