import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set message using setMessage', () => {
    ErrorService.setMessage('test msg');
    expect(ErrorService.message).toEqual('test msg');
  });

  it('should set alertWarning using displayWarning', () => {
    ErrorService.displayWarning(true);
    expect(ErrorService.alertWarning).toEqual(true);
    expect(ErrorService.alertSuccess).toEqual(false);
  });

  it('should set alertSuccess using displaySuccess', () => {
    ErrorService.displaySuccess(true);
    expect(ErrorService.alertSuccess).toEqual(true);
    expect(ErrorService.alertWarning).toEqual(false);
  });

  it('should set alertWarning to false using closeAlertWarning', () => {
    ErrorService.closeAlertWarning();
    expect(ErrorService.alertWarning).toEqual(false);
  });

  it('should set alertSuccess to false using closeAlertSuccess', () => {
    ErrorService.closeAlertSuccess();
    expect(ErrorService.alertSuccess).toEqual(false);
  });
});
