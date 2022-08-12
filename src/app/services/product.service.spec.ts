import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single product', (done) => {
    let product = new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url');

    service.getSingleProduct(1).subscribe((response) => {
      // assert that response is the product
      expect(response).toBe(product);
      done();
    });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne('http://localhost:8080/api/product/1');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(product);
  });

  it('should get multiple products', (done) => {
    let product1 = new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url');
    let product2 = new Product(
      2,
      'fancy hat',
      12,
      'bryans hat',
      99.99,
      'hat url'
    );
    let product3 = new Product(
      3,
      'not a fancy hat',
      12,
      'bryans hat',
      99.99,
      'hat url'
    );

    let products: Product[] = [product1, product2, product3];

    service.getProducts().subscribe((response) => {
      expect(response).toBe(products);
      expect(response.length).toEqual(3);
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/product');

    expect(req.request.method).toEqual('GET');

    req.flush(products);
  });

  it('should purchase a product', (done) => {
    let product = {
      id: 1,
      quantity: 10,
    };

    let products: any[] = [product];

    let product1 = new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url');

    let resultProducts: Product[] = [product1];

    service.purchase(products).subscribe((response) => {
      expect(response).toBe(resultProducts);
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/product');

    expect(req.request.method).toEqual('PATCH');

    req.flush(resultProducts);
  });
});
