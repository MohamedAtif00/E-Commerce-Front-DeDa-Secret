import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent, OrderHistoryComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule],
})
export class UserModule {}
