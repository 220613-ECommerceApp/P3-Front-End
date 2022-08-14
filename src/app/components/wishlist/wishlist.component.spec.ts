import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

import { WishlistComponent } from './wishlist.component';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [WishlistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWishlistItems on init', () => {
    let service = fixture.debugElement.injector.get<WishlistService>(
      WishlistService as Type<WishlistService>
    );
    let serviceSpy = spyOn(service, 'getWishlistItems').and.callFake(() => {
      return of([]);
    });
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('getWishlistItems should redirect to login on 401', () => {
    let service = fixture.debugElement.injector.get<WishlistService>(
      WishlistService as Type<WishlistService>
    );
    let serviceSpy = spyOn(service, 'getWishlistItems').and.returnValue(
      throwError({ status: 401 })
    );
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should find wishlist id and remove element from list', () => {
    let service = fixture.debugElement.injector.get<WishlistService>(
      WishlistService as Type<WishlistService>
    );
    let serviceSpy = spyOn(service, 'getWishlistItems').and.callFake(() => {
      return of([
        new WishlistItem(1, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')), 
        new WishlistItem(2, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')), 
        new WishlistItem(3, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url'))
      ]);
    });
    component.ngOnInit();
    serviceSpy = spyOn(service, 'removeFromWishlist').and.callFake(() => {
      return null;
    });
    component.removeFromWishlist(2);

    expect(serviceSpy).toHaveBeenCalled();
    expect(component.wishlistCount).toEqual(2);
    expect(component.wishlistItems.length).toEqual(2);
  });

  it('should find wishlist id and remove element from list', () => {
    let service = fixture.debugElement.injector.get<WishlistService>(
      WishlistService as Type<WishlistService>
    );
    let serviceSpy = spyOn(service, 'getWishlistItems').and.callFake(() => {
      return of([
        new WishlistItem(1, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')), 
        new WishlistItem(2, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')), 
        new WishlistItem(3, new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url'))
      ]);
    });
    component.ngOnInit();
    serviceSpy = spyOn(service, 'removeFromWishlist').and.callFake(() => {
      return null;
    });
    component.removeFromWishlist(2);

    expect(serviceSpy).toHaveBeenCalled();
    expect(component.wishlistCount).toEqual(2);
    expect(component.wishlistItems.length).toEqual(2);
  });

  it('should call removeFromWishlist and addToCart', () => {
    let wishlistService = fixture.debugElement.injector.get<WishlistService>(
      WishlistService as Type<WishlistService>
    );
    let wishlistServiceSpy = spyOn(wishlistService, 'getWishlistItems').and.callFake(() => {
      return of([]);
    });
    
    component.ngOnInit();

    let cartService = fixture.debugElement.injector.get<CartService>(
      CartService as Type<CartService>
    );
    let cartServiceSpy = spyOn(cartService, 'addToCart').and.returnValue();
    let componentSpy = spyOn(component, 'removeFromWishlist').and.returnValue();

    component.removeFromWishlistAndAddToCart(1,1);

    expect(cartServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });

});
