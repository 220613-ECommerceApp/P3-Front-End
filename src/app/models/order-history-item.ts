export class OrderHistoryItem {
    id: number;
    /** Should these Ids be imported objects or defined with {}'s?' */
    userId: number;
    productId: number;
    name: string;
    /** Quantity bought */
    totalQuantity: number;
    /** Price bought (product's price * quantity'). */
    totalPrice: number;
    /** Timestamp of time purchased, Do I make this a string? Our SQL query already orders by timestamp. 
    This will primarily be useful for bundling orders together (objects in the same cart will share the same or similar times). */
    purchaseTime: number;

    constructor (id: number, userId: number, productId: number, name: string, user: number, totalQuantity: number, totalPrice: number,purchaseTime: number) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
    	this.name = name;
    	this.totalQuantity = totalQuantity;
    	this.totalPrice = totalPrice;
    	this.purchaseTime = purchaseTime;
    }
}
