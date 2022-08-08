import { Product } from './product';
import { User } from './user';

export class Cartitem {
  id: number;
  quantity: number;
  product: Product;
  user: User;

  constructor(id: number, quantity: number, product: Product, user: User) {
    this.id = id;
    this.quantity = quantity;
    this.product = product;
    this.user = user;
  }
}
