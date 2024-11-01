import {Component, model, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../services/cart/cart.service';
import {KarOutDoorFormService} from '../../services/kar-out-door-form.service';
import {Country} from '../../common/country';
import {City} from '../../common/city';
import {District} from '../../common/district';

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

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private formService: KarOutDoorFormService) {
  }

  ngOnInit(): void {

    this.getTotalCounts();

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: ['']
        }),
        shippingAddress: this.formBuilder.group({
          country: [''],
          city: [''],
          district: [''],
          street: [''],
          zipCode: [''],
          text: [''],
        }),
        billingAddress: this.formBuilder.group({
          country: [''],
          city: [''],
          district: [''],
          street: [''],
          zipCode: [''],
          text: [''],
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationYear: [''],
          expirationMonth: [''],
        }),
      })

    this.initializeYears();
    this.initializeCountries();
  }

  onSubmit() {
    console.log("onsubmit called");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value);
    console.log(this.checkoutFormGroup.get('billingAddress')!.value);
    console.log(this.checkoutFormGroup.get('creditCard')!.value);
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

}
