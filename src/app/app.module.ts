import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MapLocateComponent } from './map-locate/map-locate.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
// import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FoodComponent } from './food/food.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HospitalsComponent,
    MapLocateComponent,
    FoodComponent,
    HomePageComponent,
    ShoppingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzStepsModule,
    HttpClientModule,
    CommonModule,
    GoogleMapsModule,
    ReactiveFormsModule ,
    HttpClientJsonpModule,
   
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
