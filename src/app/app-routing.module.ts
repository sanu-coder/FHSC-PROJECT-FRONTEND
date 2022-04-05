import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodComponent } from './food/food.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { LoginComponent } from './login/login.component';
import { MapLocateComponent } from './map-locate/map-locate.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'login', component: LoginComponent},
{ path: 'home', component: HomePageComponent},
{ path: 'register', component: RegisterComponent },
{ path: 'hospitals', component: HospitalsComponent },
{ path: 'map/:type/:id', component: MapLocateComponent },
{ path: 'foods', component: FoodComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'shopping', component: ShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
