import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  static message: string = "" // message for the alert
  static alertWarning: boolean = false // state of warning box
  static alertSuccess: boolean = false // state of success box

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

  // set the message within the alert box
  public static setMessage(msg: string): string {
    this.message = msg
    return this.message
  }

  // will display warning/success based on boolean value - true: display, false: hide
  // returns the value
  public static displayWarning(val: boolean): boolean{
    this.alertWarning = val
    this.alertSuccess = false
    return this.alertWarning
  }

  public static displaySuccess(val: boolean): boolean {
    this.alertSuccess = val
    this.alertWarning = false
    return this.alertSuccess
  }

  // closes the alert boxes
  public static closeAlertWarning() {
    this.alertWarning = false
  }

  public static closeAlertSuccess() {
    this.alertSuccess = false
  }

  // resets alerts, called on the error component itself
  public static resetAlerts() {
    this.alertSuccess = false
    this.alertWarning = false
  }
}
