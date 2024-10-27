import {Component} from '@angular/core';
import {Product} from '../../common/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  products: Product[] = [];

  constructor(private router: Router) {
  }


  doSearch(keyword: string) {
    console.log(keyword);
    this.router.navigateByUrl(`/search/${keyword}`);
  }


}
