import { Product } from "./product";

export class OrderHistoryItem {
    id: number;
    product!: Product;
    /** Quantity bought */
    quantity: number;
	// ndate = new Date("1986-05-04T22:59:59.000Z")
    purchaseTime: Date;

    constructor (id: number, product: Product, quantity: number, purchaseTime: string) {
        this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.purchaseTime = new Date(purchaseTime); 
    }
}
