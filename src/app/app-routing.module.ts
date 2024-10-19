import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageResolver } from './page/resolver/page.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/page.module').then((x) => x.PageModule),
    resolve: { pageData: PageResolver },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((x) => x.DashboardModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
