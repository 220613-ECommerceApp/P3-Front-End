import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { SearchResultComponent } from '../search-result/search-result.component';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'search', component: SearchResultComponent },
        ]),
      ],
      declarations: [SearchBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTags on init', () => {
    let service = fixture.debugElement.injector.get<SearchService>(
      SearchService as Type<SearchService>
    );
    let serviceSpy = spyOn(service, 'getTags').and.callFake(() => {
      return of([]);
    });
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('getTags should print error to the console', () => {
    let service = fixture.debugElement.injector.get<SearchService>(
      SearchService as Type<SearchService>
    );
    let serviceSpy = spyOn(service, 'getTags').and.returnValue(
      throwError({ status: 404 })
    );
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call searchClicked when search icon clicked', fakeAsync(() => {
    let searchClickSpy = spyOn(component, 'searchClicked').and.callThrough();

    let button =
      fixture.debugElement.nativeElement.querySelector('.search-btn');
    button.click();
    tick();
    expect(searchClickSpy).toHaveBeenCalled();
    flush();
  }));
});
