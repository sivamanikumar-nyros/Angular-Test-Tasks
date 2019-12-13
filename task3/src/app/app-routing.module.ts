import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HttpModule } from '@angular/http';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
 { 
    path: '', 
    component: HomeComponent
 },
 { 
    path: 'About', 
    component: AboutComponent
 },
 { 
    path: 'Contact', 
    component: ContactComponent
 },
 { 
    path: 'products/:id', 
    component: ProductComponent
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
