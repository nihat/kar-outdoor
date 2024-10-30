import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });

  }

  getProduct() {
    const idParam = +this.route.snapshot.paramMap.get("id")!;
    console.log("idParam = " + idParam);

    this.productService.getProduct(idParam).subscribe(
      data => {
        console.log("data = " + JSON.stringify(data));
        this.product = data;
      }
    )
  }


}
