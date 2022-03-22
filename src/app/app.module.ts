import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './components/room/room.component';
import { Material } from './materials.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { InvoiceDataComponent } from './components/invoice-data/invoice-data.component';
import { ReportComponent } from './components/report/report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    UserDetailComponent,
    ManageUserComponent,
    InvoiceDataComponent,
    ReportComponent,
    ProfileComponent,
    PaymentComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Material,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
