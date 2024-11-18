import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../services/cart/cart.service';
import {KarOutDoorFormService} from '../../services/kar-out-door-form.service';
import {Country} from '../../common/country';
import {City} from '../../common/city';
import {District} from '../../common/district';
import {CustomValidator} from '../../common/custom-validator';
import {CheckoutService} from '../../services/checkout.service';
import {Order} from '../../common/order';
import {OrderItem} from '../../common/order-item';
import {Purchase} from '../../common/purchase';
import {Router} from '@angular/router';
import {Address} from '../../common/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  months: number[] = [];
  years: number[] = [];
  countries: Country[] = [];

  shippingAddressCities: City[] = [];
  billingAddressCities: City[] = [];

  shippingAddressDistricts: District[] = [];
  billingAddressDistricts: District[] = [];

  private emailPattern: string = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';

  shippingAddressFormName: string = 'shippingAddress';
  billingAddressFormName: string = 'billingAddress';

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private formService: KarOutDoorFormService,
              private checkoutService: CheckoutService,
              private router: Router,) {
  }

  ngOnInit(): void {

    this.reviewCartDetails();
    this.initializeFormElements();
    this.initializeYears();
    this.initializeCountries();
    this.initializeDummyValues();
  }

  initializeFormElements() {
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidator.notOnlyWhiteSpace]),
          lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(this.emailPattern)]),
        }),
        shippingAddress: this.formBuilder.group({
          country: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          district: new FormControl('', [Validators.required]),
          street: new FormControl('', [Validators.maxLength(200)]),
          zipCode: new FormControl('', [Validators.maxLength(10)]),
          text: new FormControl('', [Validators.maxLength(200)]),
        }),
        billingAddress: this.formBuilder.group({
          country: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          district: new FormControl('', [Validators.required]),
          street: new FormControl('', [Validators.maxLength(200)]),
          zipCode: new FormControl('', [Validators.maxLength(10)]),
          text: new FormControl('', [Validators.maxLength(200)]),
        }),
        creditCard: this.formBuilder.group({
          cardType: new FormControl('', [Validators.required, Validators.minLength(2)]),
          nameOnCard: new FormControl('', [Validators.required, Validators.minLength(4)]),
          cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]{3}')]),
          expirationYear: new FormControl('', [Validators.required]),
          expirationMonth: new FormControl('', [Validators.required]),
        }),
      })
  }

  initializeDummyValues() {
    this.firstName?.setValue('Nihat');
    this.lastName?.setValue('K' + new Date().toLocaleDateString('en-US'));
    this.email?.setValue('nihat' + new Date().toLocaleDateString('en-US').replaceAll('/', '') + '@gmail.com');

    this.creditCardNameOnCard?.setValue(this.firstName?.value + this.lastName?.value);
    this.creditCardType?.setValue("Visa");
    this.creditCardNumber?.setValue('1234567890123456');
    this.creditCardSecurityCode?.setValue('123');

    this.shippingAddressStreet?.setValue('ship st.')
    this.shippingAddressZipCode?.setValue('ship zip.')

  }

  changeBillingAddress(event: Event) {
    console.log("changeBillingAddress : " + JSON.stringify(event));

    // @ts-ignore
    if (event.target.checked) {
      this.checkoutFormGroup.controls[this.billingAddressFormName].setValue(this.checkoutFormGroup.controls[this.shippingAddressFormName].value);
    } else {
      this.checkoutFormGroup.controls[this.billingAddressFormName].reset();
    }

    this.countryChanged(this.billingAddressFormName);
    this.cityChanged(this.billingAddressFormName);
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      (value) => this.totalQuantity = value
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    console.log("totalQuantity : " + this.totalQuantity);
    console.log("this.totalPrice : " + this.totalPrice);
  }

  initializeYears() {
    this.formService.getCreditCardYears().subscribe(
      data => this.years = data
    );
    console.log("years ===> " + this.years);
  }


  yearChanged() {
    let currentYear = new Date().getFullYear();
    let startMonth = 1;
    const creditCardFormGroup = this.checkoutFormGroup.controls['creditCard'];
    const selectedYear = Number(creditCardFormGroup.get('expirationYear')?.value);

    console.log("currentYear, currentMonth , yearForm: " + currentYear, startMonth, selectedYear);

    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => this.months = data
    );
  }

  initializeCountries() {
    this.formService.getCountries().subscribe(
      data => this.countries = data
    )
  }

  countryChanged(currentFormName: string) {

    let selectedCountryId = this.checkoutFormGroup.controls[currentFormName].value.country;
    console.log("selectedCountry = " + selectedCountryId);

    if (currentFormName === this.shippingAddressFormName) {
      this.formService.getCitiesByCountryId(selectedCountryId).subscribe(
        data => this.shippingAddressCities = data
      )
    } else {
      this.formService.getCitiesByCountryId(selectedCountryId).subscribe(
        data => this.billingAddressCities = data
      )
    }
  }

  cityChanged(currentFormName: string) {

    let selectedCityId = this.checkoutFormGroup.controls[currentFormName].value.city;
    console.log("selectedCity = " + selectedCityId);

    if (currentFormName === this.shippingAddressFormName) {
      this.formService.getDistrictsByCityId(selectedCityId).subscribe(
        data => this.shippingAddressDistricts = data
      )
    } else {
      this.formService.getDistrictsByCityId(selectedCityId).subscribe(
        data => this.billingAddressDistricts = data
      )
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressDistrict() {
    return this.checkoutFormGroup.get('shippingAddress.district');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressDistrict() {
    return this.checkoutFormGroup.get('billingAddress.district');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  get creditCardExpirationYear() {
    return this.checkoutFormGroup.get('creditCard.expirationYear');
  }

  get creditCardExpirationMonth() {
    return this.checkoutFormGroup.get('creditCard.expirationMonth');
  }

  onSubmit() {

    console.log("submit");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      console.log("this.checkoutFormGroup is invalid)");
      return;
    }

    const customer = this.checkoutFormGroup.controls['customer'].value;
    const shippingAddress: Address = this.checkoutFormGroup.controls[this.shippingAddressFormName].value;
    const billingAddress: Address = this.checkoutFormGroup.controls[this.billingAddressFormName].value;
    const creditCard = this.checkoutFormGroup.controls['creditCard'].value;

    console.log(JSON.stringify(customer));
    console.log(JSON.stringify(shippingAddress));
    console.log(JSON.stringify(billingAddress));
    console.log(JSON.stringify(creditCard))

    let order = new Order(this.totalQuantity, this.totalPrice);
    let orderItems: OrderItem[] = this.cartService.cartItems.map(item => new OrderItem(item));

    const purchase: Purchase = new Purchase(
      customer, shippingAddress, billingAddress, order, creditCard, orderItems,
      this.totalQuantity, this.totalPrice);

    return this.checkoutService.purchase(purchase).subscribe(
      {
        next: response => {
          this.success(response);
        },
        error: error => {
          console.log(error);
          alert('Error crating order : ' + JSON.stringify(error));
        }
      }
    );
  }

  private success(response: any) {
    this.resetCarts();
    this.router.navigateByUrl(`checkout/success/${response.trackingNumber}`);
  }

  private resetCarts() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
  }
}
