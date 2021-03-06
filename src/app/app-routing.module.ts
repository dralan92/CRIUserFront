import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PlantsComponent } from './plants/plants.component';
import { PlantDashboardComponent } from './plants/plant-dashboard/plant-dashboard.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';

const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {path:'user', component:UserComponent,
    children :[
      {path:'registration', component: RegistrationComponent},
      {path:'login', component: LoginComponent}
    ]

  },
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'plants', component: PlantsComponent},
  {path:'plant-detail/:id', component: PlantDetailComponent},
  {path:'plant-dashboard', component: PlantDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
