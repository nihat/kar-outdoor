import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8088/api/v1/products";
  private productCategoryUrl = "http://localhost:8088/api/v1/product-category";

  constructor(private httpClient: HttpClient) {
  }


  getProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductsByCategory(theCategoryId: number): Observable<Product[]> {
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchURL);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const finalUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    console.log(finalUrl);
    return this.getProducts(finalUrl);
  }
}


interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
