import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { faImages } from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[lazyLoadImg]',
})
export class LazyLoadImgDirective {
  /*   Basic lazy loading for images, using Intersection Observer API
       https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API 
  */

  private intersectionObserver?: IntersectionObserver;
  private element;

  @Output() lazyLoadImg = new EventEmitter<any>();

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  private handleIntersect = (entries: any): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && entry.target === this.element) {
        this.lazyLoadImg.emit();
        //stop observing and disconnect
        this.intersectionObserver?.unobserve(this.element);
        this.intersectionObserver?.disconnect();
      }
    });
  };

  public ngAfterViewInit() {
    /// check if browser supports Intersection Observer API
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersect
      );
      this.intersectionObserver.observe(this.element);
    } else {
      this.lazyLoadImg.emit();
    }
  }
}
