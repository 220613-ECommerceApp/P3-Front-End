import { Product } from "./product";

export class WishlistItem {
    id: number;
    product!: Product;

    constructor (id: number, product: Product) {
        this.id = id;
		this.product = product;
    }
}
