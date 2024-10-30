import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {provideHttpClient} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {NgOptimizedImage} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './component/cart-details/cart-details.component';

const routes: Routes = [
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgbModule,
  ],
  providers: [
    provideHttpClient(),
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
