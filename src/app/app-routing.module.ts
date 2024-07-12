import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./page/page.module').then(x =>x.PageModule)},
  {path:'admin',loadChildren:()=>import('./dashboard/dashboard.module').then(x =>x.DashboardModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
