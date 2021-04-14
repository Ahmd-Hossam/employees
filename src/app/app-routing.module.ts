import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HomeComponent } from './layout/home/home.component';
import { UserComponent } from './layout/user/user.component';


const routes: Routes = [
  {path:'', component:HomeComponent},

  {path:'admin', component:AdminComponent, children:[
    {path:'posts', loadChildren:()=>import('./views/posts/posts.module').then( m => m.PostsModule)}
  ]},
   
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
