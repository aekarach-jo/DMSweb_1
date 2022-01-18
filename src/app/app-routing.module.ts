import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login-page',pathMatch: 'full' },
  { path: 'room', component: RoomComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
