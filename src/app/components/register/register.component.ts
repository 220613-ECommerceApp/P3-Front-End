import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasError: boolean = false;
  errMsg: string = "";

  registerForm = new FormGroup({
    uname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.authService.register(this.registerForm.get('uname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      () => console.log("New user registered"),
      (err) => {
        this.hasError = ErrorService.displayWarning(true) // set the error state to true
        ErrorService.setMessage(err.error) // set the error message
      },
      () => this.router.navigate(['login'])
    );
  }

  trimInput(): void {
    
  }

}
