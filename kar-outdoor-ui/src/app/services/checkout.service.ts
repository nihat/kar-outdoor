import {Injectable} from '@angular/core';
import {Purchase} from '../common/purchase';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  purchaseURL = "http://localhost:8088/api/v1/checkout/purchase";

  constructor(private httpClient: HttpClient) {
  }


  purchase(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseURL ,purchase);
  }
}
