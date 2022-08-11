import { Component, Input, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  @Input() message: string = ErrorService.getMessage()

  constructor() { }

  ngOnInit(): void {
  }

  getAlertWarning(): boolean {
    this.message = ErrorService.getMessage()
    return ErrorService.getWarning()
  }

  getAlertSuccess(): boolean {
    this.message = ErrorService.getMessage()
    return ErrorService.getSuccess()
  }
  
  closeAlertWarning(){
    ErrorService.setMessage("")
    ErrorService.closeAlertWarning()
  }
  
  closeAlertSuccess(){
    ErrorService.setMessage("")
    ErrorService.closeAlertSuccess()
  }
}
