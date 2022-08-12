import { Product } from "./product";
export class Wishlist {
    id: number;
    product!: Product;
    constructor (id: number, product: Product) {
        this.id = id;
		this.product = product;
    }
}
