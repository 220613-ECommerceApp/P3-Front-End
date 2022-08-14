import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    //mock local storage
    let store: any = {};
    const localStorageMock = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
  });

  afterEach(() => {
    // After every test, verify that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test async function using done callback
  it('should allow user to login, returning token', (done) => {
    const authToken = 'thisisatokenfortest@gmailcom';

    service.login('test@gmail.com', 'pass').subscribe((response) => {
      // assert that response is the authToken
      expect(response).toBe(authToken);
      done();
    });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne('http://localhost:8080/auth/login');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('POST');

    // Respond with mock data, causing Observable to resolve.
    // assertion in .subscribe will execute
    req.flush(authToken);
  });

  it('should allow user to logout', () => {
    const authToken = 'thisisatokenfortest@gmailcom';
    localStorage.setItem('token', authToken);

    spyOn(service, 'logout').and.callThrough();

    service.logout();

    expect(localStorage.getItem('token')).toBeFalsy();
  });

  //another way to test async functions, faking async
  it('should allow user to register', fakeAsync(() => {
    const authToken = 'thisisatokenfortest@gmailcom';

    service
      .register('jdoe123', 'Jane', 'Doe', 'test@gmail.com', 'pass')
      .subscribe((response) => {
        expect(response).toBe(authToken);
        //simulates async passage of time
        tick();
      });

    const req = httpMock.expectOne('http://localhost:8080/auth/register');
    expect(req.request.method).toEqual('POST');

    req.flush(authToken);
  }));
});
