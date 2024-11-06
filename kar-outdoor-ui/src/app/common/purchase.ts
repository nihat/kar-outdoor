import {Customer} from './customer';
import {Address} from './address';
import {OrderItem} from './order-item';
import {Order} from './order';
import {CreditCard} from './credit-card';

export class Purchase {

  constructor(public customer: Customer,
              public shippingAddress: Address,
              public billingAddress: Address,
              public order: Order,
              public creditCard : CreditCard,
              public orderItems: OrderItem[],
              public totalQuantity: number,
              public totalPrice: number,) {

  }
}
