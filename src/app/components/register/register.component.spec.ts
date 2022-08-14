import { HttpClientTestingModule } from '@angular/common/http/testing';
import { asNativeElements } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'src/app/services/error.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [RegisterComponent],
      providers: [ErrorService],
    }).compileComponents();
    errorService = TestBed.inject(ErrorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkValid when submit button is clicked, valid input', fakeAsync(() => {
    let submitClickSpy = spyOn(component, 'checkValid').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    fixture.debugElement.nativeElement.querySelector('#inputUserName').value =
      'testUser';
    fixture.debugElement.nativeElement.querySelector('#inputFirst').value =
      'John';
    fixture.debugElement.nativeElement.querySelector('#inputLastName').value =
      'Who';
    fixture.debugElement.nativeElement.querySelector('#inputEmail').value =
      'testUser@gmail.com';
    fixture.debugElement.nativeElement.querySelector('#inputPassword').value =
      'password123456';

    button.click();
    tick();
    expect(submitClickSpy).toHaveBeenCalled();
    flush();
  }));

  it('should checkValid on submit button clicked, show set error message using ErrorService', fakeAsync(() => {
    let displayWarningSpy = spyOn(
      ErrorService,
      'displayWarning'
    ).and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    fixture.debugElement.nativeElement.querySelector('#inputUserName').value =
      'testUser';
    fixture.debugElement.nativeElement.querySelector('#inputFirst').value =
      'John';
    fixture.debugElement.nativeElement.querySelector('#inputLastName').value =
      'Who';
    fixture.debugElement.nativeElement.querySelector('#inputEmail').value =
      'testUser@gmail.com';
    fixture.debugElement.nativeElement.querySelector('#inputPassword').value =
      'pass';

    button.click();
    tick();
    expect(displayWarningSpy).toHaveBeenCalled();
    flush();
  }));

  it('should call checkValid when submit button is clicked, invalid form input', fakeAsync(() => {
    let submitClickSpy = spyOn(component, 'checkValid').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    fixture.debugElement.nativeElement.querySelector('#inputUserName').value =
      'testUser';
    fixture.debugElement.nativeElement.querySelector('#inputFirst').value =
      'John';
    fixture.debugElement.nativeElement.querySelector('#inputLastName').value =
      'Who';
    fixture.debugElement.nativeElement.querySelector('#inputEmail').value =
      'an email address';
    fixture.debugElement.nativeElement.querySelector('#inputPassword').value =
      'password123456';

    button.click();
    tick();
    expect(submitClickSpy).toHaveBeenCalled();
    flush();
  }));

  it('should call  trimInput on input entry', fakeAsync(() => {
    let trimInputSpy = spyOn(component, 'trimInput').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    let input = fixture.debugElement.query(By.css('#inputUserName'));

    input.nativeElement.value = 'testUser ';
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(input.nativeElement.value).toEqual('testUser');
    // button.click();
    //tick();
    //expect(trimInputSpy).toHaveBeenCalled();
    //flush();
  }));
});
