import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "Outdoor Giyim";
  searchMode = false;
  previousSearchKeyword = '';

  //pagination properties
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const categoryIdAvailable: boolean = this.route.snapshot.paramMap.has('id');
    console.log("categoryIdAvailable", categoryIdAvailable);
    if (categoryIdAvailable) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductsPaginate(
      this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(
        this.processResult());
  }

  processResult() {
    return (data: any) => {
      console.log(`currentCategoryId= ${this.currentCategoryId} , previousCategoryId= ${this.previousCategoryId}`);
      console.log("this.pageSize = " + this.pageSize + " this.pageNumber = " + this.pageNumber + " , this.totalElements = " + this.totalElements);
      this.products = data._embedded.products;
      this.pageSize = data.page.size;
      this.pageNumber = data.page.number + 1;
      this.totalElements = data.page.totalElements;
    };
  }

  handleSearchProducts() {
    const searchKey: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousSearchKeyword != searchKey) {
      this.pageNumber = 1;
    }
    this.previousSearchKeyword = searchKey;

    this.productService.searchProductsPaginate(
      searchKey,
      this.pageNumber - 1,
      this.pageSize).subscribe(
      this.processResult()
    );
  }

  changePageSize(value: string) {
    this.pageSize = +value;
    this.pageNumber = 1;
    this.listProducts()
  }

  addToCart(currentProduct: Product) {
    const cartItem = new CartItem(currentProduct);
    this.cartService.addToCart(cartItem);
  }
}

