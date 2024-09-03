import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'admin-login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
