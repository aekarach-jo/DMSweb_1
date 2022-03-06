import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { InvoiceDataComponent } from './components/invoice-data/invoice-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'room',pathMatch: 'full' },
  { path: 'room', component: RoomComponent },
  { path: 'invoice-data', component: InvoiceDataComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: 'manage-user', component: ManageUserComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
