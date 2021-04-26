import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';


//must add this
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent, AuthComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule,

  ]
})
export class LayoutModule { }
