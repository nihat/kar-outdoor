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

  getProductsPagination( pageNumber: number, pageSize: number,categoryId: number): Observable<GetResponseProducts> {
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
    console.log(searchURL);
    return this.httpClient.get<GetResponseProducts>(searchURL);
  }

  getProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductsByCategory(theCategoryId: number): Observable<Product[]> {
    console.log("theCategoryId = " + theCategoryId);
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


  getProduct(id: number): Observable<Product> {
    const finalUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(finalUrl);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
