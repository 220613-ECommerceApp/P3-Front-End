import { Product } from "./product";

export class OrderHistoryItem {
    id: number;
    product!: Product;
    /** Quantity bought */
    quantity!: number;
    timestamp!: Date;

    constructor (id: number, product: Product, quantity: number, timestamp: string) {
        this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.timestamp = new Date(timestamp);
    }
}
