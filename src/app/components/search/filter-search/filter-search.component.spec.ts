import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'src/app/services/error.service';
import { SearchResultComponent } from '../search-result/search-result.component';

import { FilterSearchComponent } from './filter-search.component';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;
  let fixture: ComponentFixture<FilterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'search', component: SearchResultComponent },
        ]),
      ],
      providers: [ErrorService],
      declarations: [FilterSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterClicked when clicking Go, with valid input', fakeAsync(() => {
    let goClickSpy = spyOn(component, 'filterClicked').and.callThrough();

    let goButton = fixture.debugElement.nativeElement.querySelector('.btn');

    goButton.click();
    tick();
    expect(goClickSpy).toHaveBeenCalled();
    flush();
  }));

  it('should have filterClicked return when clicking Go, with invalid input (minPrice > maxPrice)', fakeAsync(() => {
    let goClickSpy = spyOn(component, 'filterClicked').and.callThrough();

    let goButton = fixture.debugElement.nativeElement.querySelector('.btn');

    component.minPrice = 100;
    component.maxPrice = 10;

    goButton.click();
    tick();
    expect(goClickSpy).toHaveBeenCalled();
    flush();
  }));
});
