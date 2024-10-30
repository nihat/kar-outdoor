import {Injectable} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }


  addToCart(cartItem: CartItem) {
    let currentCartItem = this.cartItems.find(item => item.id === cartItem.id);
    if (currentCartItem != undefined) {
      currentCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeTotals();
  }

  computeTotals() {
    let totalQ: number = 0;
    let totalPrice: number = 0;

    for (let item of this.cartItems) {
      totalQ += item.quantity;
      totalPrice += item.unitPrice * item.quantity;
    }

    this.logCartItemData(totalQ, totalPrice);
    this.totalQuantity.next(totalQ);
    this.totalPrice.next(Number(totalPrice.toFixed(2)));
  }


  private logCartItemData(totalQ: number, totalPrice: number) {
    for (let item of this.cartItems) {
      console.log(`${item.name} Quantity: ${item.quantity} , Sub Total Price : ${item.unitPrice * item.quantity} `);
    }
    console.log("totalQuantity : " + totalQ + " , totalPrice : " + totalPrice);
  }
}
