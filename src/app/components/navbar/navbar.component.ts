import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  faUser = faUser;
  faCart = faShoppingCart;

  constructor(
    private authService: AuthService,
    private router: Router    
  ) {}

  ngOnInit(): void {
  }

  

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
