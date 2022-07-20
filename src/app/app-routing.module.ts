import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { InvoiceDataComponent } from './components/invoice-data/invoice-data.component';
import { ReportComponent } from './components/report/report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'room',pathMatch: 'full' },
  { path: 'room', component: RoomComponent },
  { path: 'invoice-data', component: InvoiceDataComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: 'manage-user', component: ManageUserComponent},
  { path: 'report', component: ReportComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'setting', component: SettingComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'payment', component: PaymentComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
