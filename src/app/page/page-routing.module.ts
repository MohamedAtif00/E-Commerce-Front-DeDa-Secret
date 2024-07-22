import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';

const routes:Routes = [
  {path:'',component:PageComponent,children:[
    { path: '', loadChildren: () => import('./../modules/home/home.module').then(x => x.HomeModule) },
    {path:'cart',loadChildren:()=>import('./../modules/cart/cart.module').then(x =>x.CartModule)}
    // {path:'admin',loadChildren:()=>import('./../modules/admin/admin.module').then(x =>x.AdminModule)}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PageRoutingModule { }
