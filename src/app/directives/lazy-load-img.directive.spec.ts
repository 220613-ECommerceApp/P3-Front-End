import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LazyLoadImgDirective } from './lazy-load-img.directive';

class MockElementRef extends ElementRef {
  nativeElement = {};
}

describe('LazyLoadImgDirective', () => {
  let mockElementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [LazyLoadImgDirective],
      providers: [{ provide: ElementRef, useValue: MockElementRef }],
    });

    mockElementRef = TestBed.inject(ElementRef);
  });

  it('should create an instance', () => {
    const directive = new LazyLoadImgDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
