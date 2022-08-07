import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Cartitem } from 'src/app/models/cartitem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async addToCart(product: Product): Promise<any> {
    this.auth.updateBearer();
    let inCart = false;
    let data = await this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .toPromise();

    data.forEach((p) => {
      if (product.id === p.product.id) {
        inCart = true;
      }
    });
    if (inCart) {
      console.log('increase quantity only');
    } else {
      this.cartservice.addToCart(product.id, 1).subscribe();
    }
  }

  ngOnDestroy() {}
}
