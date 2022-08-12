import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.productInfo = new Product(
      1,
      'hat',
      12,
      'bryans hat',
      99.99,
      'hat url'
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToCart when add to cart button is clicked', fakeAsync(() => {
    let addToCartSpy = spyOn(component, 'addToCart').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector('.btn');
    button.click();
    tick();
    expect(addToCartSpy).toHaveBeenCalled();
    flush();
  }));
});
