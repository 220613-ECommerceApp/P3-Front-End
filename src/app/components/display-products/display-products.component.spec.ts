import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';
import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DisplayProductsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ProductService on init', () => {
    //get the service to spy on
    let service = fixture.debugElement.injector.get<ProductService>(
      ProductService as Type<ProductService>
    );

    //create a spy to watch this service
    let serviceSpy = spyOn(service, 'getProducts').and.callFake(() => {
      return of([]);
    });

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('getProducts should throw an error', () => {
    let service = fixture.debugElement.injector.get<ProductService>(
      ProductService as Type<ProductService>
    );

    let serviceSpy = spyOn(service, 'getProducts').and.returnValue(
      throwError({ status: 404 })
    );
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
