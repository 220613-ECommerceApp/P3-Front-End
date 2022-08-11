import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  @Input() alertWarning: boolean = false
  @Input() alertSuccess: boolean = false
  @Input() errorMessage: string = ""

  constructor() { }

  ngOnInit(): void {
  }
  
    closeAlertWarning(){
      this.alertWarning=false;
    }
  
    closeAlertSuccess(){
      this.alertSuccess=false;
    }
}
