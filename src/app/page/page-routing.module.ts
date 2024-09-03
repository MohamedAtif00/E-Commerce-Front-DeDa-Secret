import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { ContactUsComponent } from '../modules/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../modules/home/home.module').then((x) => x.HomeModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./../modules/cart/cart.module').then((x) => x.CartModule),
      },
      { path: 'contact-us', component: ContactUsComponent },
      {
        path: 'product-detials/:id',
        loadChildren: () =>
          import('./../modules/products/products.module').then(
            (x) => x.ProductsModule
          ),
      },
      // {path:'admin',loadChildren:()=>import('./../modules/admin/admin.module').then(x =>x.AdminModule)}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
