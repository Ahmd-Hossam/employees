import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'


@NgModule({
  declarations: [ListNotesComponent, ShowNotesComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class NotesModule { }
