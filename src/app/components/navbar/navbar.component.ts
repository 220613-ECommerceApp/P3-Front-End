import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLoggedIn = localStorage.getItem('token') == null ? false : true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isCurrentLocation(url: string): boolean {
    return this.router.url === url;
  }

  refresh() {
    if(!(this.router.url == '/home')) return
    window.location.reload();
  }

  logout() {
    this.authService.logout();
    if (this.router.url == '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['home']);
    }
  }
}
