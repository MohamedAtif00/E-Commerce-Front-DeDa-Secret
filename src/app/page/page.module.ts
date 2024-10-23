import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { AppModule } from '../app.module';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [PageComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    TranslateModule,
    MenubarModule,
    ProgressSpinnerModule,
  ],
})
export class PageModule {}
