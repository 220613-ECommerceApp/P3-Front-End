import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount!: number;
  userLoggedIn = localStorage.getItem('token') == null ? false : true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    //this.cartservice.getCartCount().then(num=>this.cartCount=num);
  }

  isCurrentLocation(url: string): boolean {
    return this.router.url === url;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
