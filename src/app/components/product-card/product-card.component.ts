import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
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
    private cartservice: CartService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  async addToCart(product: Product): Promise<any> {
    let inCart = false;
    let currentQuantity=0;
    let data = await this.http
      .get<Cartitem[]>(environment.baseUrl + '/api/cart', {
        headers: environment.headers,
      })
      .toPromise();

    data.forEach((p) => {
      if (product.id == p.product.id) {
        inCart = true;
        currentQuantity = p.quantity;
      }
    });
    if (inCart) {
        this.cartservice.updateQuantity(currentQuantity+1, product.id);      
    } else {
     this.cartservice.addToCart(product.id, 1);
    }
    // location.reload();
  }

  ngOnDestroy() {}
}
