import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HttpModule } from '@angular/http';
import { ProductComponent } from './product/product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { DaterangepickerModule } from 'angular-2-daterangepicker';
import { Options } from 'angular-2-daterangepicker';

// import * as $ from 'jquery';


import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxPaginationModule,
    SelectDropDownModule,
    Ng2SearchPipeModule,
    DaterangepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
