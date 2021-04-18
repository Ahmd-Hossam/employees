import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { HomeComponent } from './layout/home/home.component';
import { UserComponent } from './layout/user/user.component';


const routes: Routes = [
  {path:'', component:HomeComponent},

 
  {path:'user', component:UserComponent, children:[
    {path:'notes', loadChildren:()=>import('./views/notes/notes.module').then( m => m.NotesModule)}
  ]},

  {path:'auth', component:AuthComponent, children:[
    {path:'', loadChildren:()=>import('./views/auth/auth.module').then( m => m.AuthModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
