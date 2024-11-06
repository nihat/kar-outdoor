import {CartItem} from './cart-item';

export class OrderItem {

  productId: number;
  unitPrice: number;
  imageUrl: string;
  quantity: number;

  constructor(private cartItem: CartItem) {
    this.productId = cartItem.id;
    this.unitPrice = cartItem.unitPrice;
    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
  }
}
