import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//my imports 
import { HttpClientModule  } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter'

//import layout module
import {LayoutModule} from './layout/layout.module';

//intercenptors
import { MyInterceptor } from './shard/interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NavComponent } from './layout/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    //Ng2SearchPipeModule
    
  ],
  providers: [MyInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
