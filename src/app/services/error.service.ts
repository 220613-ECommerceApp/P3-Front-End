import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  static message: string = ""
  static alertWarning: boolean = false
  static alertSuccess: boolean = false

  constructor() { }

  public static getMessage(): string {
    return this.message
  }

  public static getWarning(): boolean {
    return this.alertWarning
  }

  public static getSuccess(): boolean {
    return this.alertSuccess
  }

  public static setMessage(msg: string): string {
    this.message = msg
    return this.message
  }

  public static displayWarning(val: boolean): boolean{
    this.alertWarning = val
    this.alertSuccess = !val
    return this.alertWarning
  }

  public static displaySuccess(val: boolean): boolean {
    this.alertSuccess = val
    this.alertWarning = !val
    return this.alertSuccess
  }

  public static closeAlertWarning() {
    this.alertWarning = false
  }

  public static closeAlertSuccess() {
    this.alertSuccess = false
  }

  // call on init for any component
  public static resetAlerts() {
    this.alertSuccess = false
    this.alertWarning = false
  }
}
