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
  registerForm = new FormGroup({
    uname: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.authService.register(this.registerForm.get('uname')?.value, this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      () => console.log("New user registered"),
      (err) => {
        ErrorService.displayWarning(true) // set the error state to true
        ErrorService.setMessage(err.error) // set the error message
      },
      () => this.router.navigate(['login'])
    );
  }

  trimInput(e: any): void {
    e.target.value = e.target.value.trim().replace(/\s/g, "")
  }

  checkValid(): void {
    if(this.registerForm.controls.password.errors) {
      ErrorService.displayWarning(true)
      ErrorService.setMessage("Password should be at least 6 characters long")
    }
  }

}
