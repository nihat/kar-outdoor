import {Component, model, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../services/cart/cart.service';
import {KarOutDoorFormService} from '../../services/kar-out-door-form.service';
import {Country} from '../../common/country';
import {City} from '../../common/city';
import {District} from '../../common/district';
import {CustomValidator} from '../../common/custom-validator';

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

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private formService: KarOutDoorFormService) {
  }

  ngOnInit(): void {

    this.getTotalCounts();

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
          cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16) , Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('[0-9]{3}')]),
          expirationYear: new FormControl('', [Validators.required]),
          expirationMonth: new FormControl('', [Validators.required]),
        }),
      })

    this.initializeYears();
    this.initializeCountries();
  }

  changeBillingAddress(event: Event) {
    console.log("changeBillingAddress : " + JSON.stringify(event));

    // @ts-ignore
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  getTotalCounts() {
    let totalQ = 0;
    this.cartService.totalQuantity.subscribe(
      (value) => totalQ = value
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    console.log("totalQ : " + totalQ);
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

    let selectedCountryId = this.checkoutFormGroup.get([currentFormName])?.value.country;
    console.log("selectedCountryId = " + selectedCountryId);

    if (currentFormName === 'shippingAddress') {
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

    let selectedCityId = this.checkoutFormGroup.get([currentFormName])?.value.city;
    console.log("selectedCountryId = " + selectedCityId);

    if (currentFormName === 'shippingAddress') {
      this.formService.getDistrictsByCityId(selectedCityId).subscribe(
        data => this.shippingAddressDistricts = data
      )
    } else {
      this.formService.getDistrictsByCityId(selectedCityId).subscribe(
        data => this.billingAddressDistricts = data
      )
    }
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressDistrict() { return this.checkoutFormGroup.get('shippingAddress.district'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressDistrict() { return this.checkoutFormGroup.get('billingAddress.district'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get creditCardExpirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }
  get creditCardExpirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      console.log("this.checkoutFormGroup is invalid)");
      return;
    }

  }

}
