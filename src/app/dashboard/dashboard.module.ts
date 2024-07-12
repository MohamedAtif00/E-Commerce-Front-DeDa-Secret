import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AppModule } from '../app.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';


const routes:Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'',loadChildren:()=>import('./../modules/admin/admin.module').then(x =>x.AdminModule)}
  ]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // AppModule
]
})
export class DashboardModule { }
