import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.listProducts();
      if (!this.currentCategoryName) {
        this.currentCategoryName = "Outdoor Giyim"
      }
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
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
      result => this.products = result
    );
  }

  handleSearchProducts() {
    const searchKey: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(searchKey).subscribe(
      data => {
        console.log("data= " + JSON.stringify(data));
        this.products = data;
      }
    );
  }

}
