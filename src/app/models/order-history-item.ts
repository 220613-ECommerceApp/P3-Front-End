import { Product } from "./product";

export class OrderHistoryItem {
    id: number;
    product!: Product;
    name: string;
    /** Quantity bought */
    totalQuantity: number;
    /** Price bought (product's price * quantity'). */
    totalPrice: number;
    /** Timestamp of time purchased, Do I make this a string? Our SQL query already orders by timestamp. 
    This will primarily be useful for bundling orders together (objects in the same cart will share the same or similar times). */
    purchaseTime: number;

    constructor (id: number, product: Product, name: string, user: number, totalQuantity: number, totalPrice: number,purchaseTime: number) {
        this.id = id;
        this.product = product;
    	this.name = name;
    	this.totalQuantity = totalQuantity;
    	this.totalPrice = totalPrice;
    	this.purchaseTime = purchaseTime;
    }
}
