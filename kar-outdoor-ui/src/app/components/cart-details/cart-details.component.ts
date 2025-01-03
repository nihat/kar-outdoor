import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  shippingPrice: number = 0.0;


  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this.cartService.computeTotals();

  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  removeItem(item: CartItem) {
    this.cartService.remove(item);
  }
}
