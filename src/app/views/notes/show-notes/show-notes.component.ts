import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/shard/services/notes.service';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.scss']
})
export class ShowNotesComponent implements OnInit {
  myform!: FormGroup;
  @Input() itemId:any;
  @Output() items= new EventEmitter
  constructor(private fb: FormBuilder, private note_Ser: NotesService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.build();
    this.getDetails(this.itemId)
  }

  build() {
    this.myform = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  //add item 
  additem(data: any) {
    this.note_Ser.add(data).subscribe(
      res => {
        this.toaster.success('item added successfuly', 'successfuly')
      },
      err => {
        this.toaster.error(err, "Erorr")
      }
    );
    this.afterUpdate()
  }


  //edite item 
  update(id: any, data: any) {
    this.note_Ser.update(id, data).subscribe(
      res => {
        this.toaster.success('item updated susscussfuly', 'updated')
      },
      err => {
        this.toaster.error(err, 'Error')
      }
    )
    this.afterUpdate();
  }

  //get item details 
  getDetails(id:any) {
    this.note_Ser.getItem(id).subscribe(
      res => {
        this.myform.patchValue({
          title: res.title,
          description: res.description
        })
      }
    )
  }



  onsubmit(id:any) {
    if(id === ''){
      this.additem(this.myform.value)
    }else{
      this.update(id,this.myform.value)
    }
  }

   //update items 
  afterUpdate(){
    this.note_Ser.getAll().subscribe(
      res=>{
        this.items.emit(res)
      }
    )
  }
}
