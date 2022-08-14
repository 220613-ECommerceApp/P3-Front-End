import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(!this.loginForm.get('email')?.value || !this.loginForm.get('password')?.value){
      ErrorService.displayWarning(true)
      ErrorService.setMessage('Input for Username or Password is missing');
    }
    else{
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token)
      },
      (err) => {
        ErrorService.displayWarning(true) // set the error state to true
        ErrorService.setMessage('Invalid Email Address or Password') // set the error message
      },
      () => this.router.navigate(['home'])
    );
  }
}

  register(): void {
    this.router.navigate(['register']);
  }

}
