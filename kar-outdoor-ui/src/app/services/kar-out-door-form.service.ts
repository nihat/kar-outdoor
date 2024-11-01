import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Country} from '../common/country';
import {HttpClient} from '@angular/common/http';
import {City} from '../common/city';
import {District} from '../common/district';

@Injectable({
  providedIn: 'root'
})
export class KarOutDoorFormService {

  countryUrl: string = "http://localhost:8088/api/v1/countries";
  cityBaseUrl: string = "http://localhost:8088/api/v1/cities";
  districtBaseUrl: string = "http://localhost:8088/api/v1/districts";

  constructor(private httpClient: HttpClient) {
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let months: number[] = [];

    for (let i = startMonth; i <= 12; i++) {
      months.push(i);
    }
    return of(months);
  }


  getCreditCardYears(): Observable<number[]> {
    let years: number[] = [];
    let startYear = new Date().getFullYear();
    let endYear = startYear + 10;
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return of(years);
  }


  getCountries(): Observable<Country[]> {
    const finalUrl = `${this.countryUrl}/search/findAllCountries`;
    return this.httpClient.get<GetResponseCountry>(finalUrl).pipe(
      map(result => result._embedded.countries)
    );
  }

  getCitiesByCountryId(countryId: number): Observable<City[]> {
    const finalUrl = `${this.cityBaseUrl}/search/findByCountryId?countryId=${countryId}`;
    return this.httpClient.get<GetResponseCity>(finalUrl).pipe(
      map(response => response._embedded.cities)
    );
  }

  getDistrictsByCityId(cityId: number): Observable<District[]> {
    const finalUrl = `${this.districtBaseUrl}/search/findDistrictsByCityId?cityId=${cityId}`;
    return this.httpClient.get<GetResponseDistrict>(finalUrl).pipe(
      map(response => response._embedded.districts)
    );
  }

}




interface GetResponseCountry {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseCity {
  _embedded: {
    cities: City[];
  }
}

interface GetResponseDistrict {
  _embedded: {
    districts: District[];
  }
}
