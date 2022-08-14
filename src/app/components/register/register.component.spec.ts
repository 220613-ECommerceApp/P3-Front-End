import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { throwError, of } from 'rxjs';
import {
  RouterTestingModule,
  setupTestingRouter,
} from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

import { RegisterComponent } from './register.component';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      declarations: [RegisterComponent],
      providers: [ErrorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //setup user
    let uname = component.registerForm.controls['uname'];
    uname.setValue('testUser');
    let fname = component.registerForm.controls['fname'];
    fname.setValue('John');
    let lname = component.registerForm.controls['lname'];
    lname.setValue('Who');
    let email = component.registerForm.controls['email'];
    email.setValue('jwho@gmail.com');
    let password = component.registerForm.controls['password'];
    password.setValue('password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkValid when submit button is clicked, valid input', fakeAsync(() => {
    let submitClickSpy = spyOn(component, 'checkValid').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    button.click();
    tick();
    expect(submitClickSpy).toHaveBeenCalled();
  }));

  it('should checkValid on submit button clicked, show set error message using ErrorService. Invalid password', fakeAsync(() => {
    let displayWarningSpy = spyOn(
      ErrorService,
      'displayWarning'
    ).and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    let password = component.registerForm.controls['password'];
    password.setValue('pas');

    tick();
    button.click();
    tick();
    expect(password.valid).toBeFalsy();
    expect(displayWarningSpy).toHaveBeenCalled();
    flush();
  }));

  it('should call checkValid when submit button is clicked, invalid form input. Invalid email', fakeAsync(() => {
    let submitClickSpy = spyOn(component, 'checkValid').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    let email = component.registerForm.controls['email'];
    email.setValue(null);

    button.click();
    tick();
    expect(email.valid).toBeFalsy();
    expect(submitClickSpy).toHaveBeenCalled();
    flush();
  }));

  it('should remove spaces on input field change', fakeAsync(() => {
    let trimInputSpy = spyOn(component, 'trimInput').and.callThrough();

    let input = fixture.debugElement.query(By.css('#inputUserName'));

    input.nativeElement.value = 'test ';
    input.nativeElement.dispatchEvent(new Event('change'));

    expect(input.nativeElement.value).toEqual('test');

    expect(trimInputSpy).toHaveBeenCalled();
    flush();
  }));

  it('should login user on successful registration', fakeAsync(() => {
    let authService = fixture.debugElement.injector.get<AuthService>(
      AuthService as Type<AuthService>
    );
    let serviceSpy = spyOn(authService, 'register').and.callFake(() => {
      return of([]);
    });

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    button.click();
    tick();
    expect(serviceSpy).toHaveBeenCalled();
    flush();
  }));

  it('should throw an error if something went bad on registration', fakeAsync(() => {
    let displayWarningSpy = spyOn(
      ErrorService,
      'displayWarning'
    ).and.callThrough();

    let authService = fixture.debugElement.injector.get<AuthService>(
      AuthService as Type<AuthService>
    );
    let serviceSpy = spyOn(authService, 'register').and.returnValue(
      throwError({ status: 404 })
    );

    let button = fixture.debugElement.nativeElement.querySelector(
      'input[type="submit"]'
    );

    button.click();
    tick();
    expect(serviceSpy).toHaveBeenCalled();
    expect(displayWarningSpy).toHaveBeenCalled();
    flush();
  }));
});
