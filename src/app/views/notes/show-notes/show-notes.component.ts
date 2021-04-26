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
  @Output() items= new EventEmitter <any> ()
  constructor(private fb: FormBuilder, private note_Ser: NotesService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.build();
    this.getDetails(this.itemId)
  }

  build() {
    this.myform = this.fb.group({
      description: [null, Validators.required],
    })
  }

  //add item 
  additem(data: any) {
    this.note_Ser.add(data).subscribe(
      res => {
        this.toaster.success('تم اضافة موظف جديد')
      },
      err => {
        console.log("خطا ", err);
        
        this.toaster.error(err, "خطا")
      }
    );
    this.afterUpdate()//updated  data
  }


  //edite item 
  update(id: any, data: any) {
    this.note_Ser.update(id, data).subscribe(
      res => {
        this.toaster.success('تم تعديل البيانات بنجاج')
        this.afterUpdate();//updated  data
      },
      err => {
        this.toaster.error(err, 'Error')
      }
    )
  }

  //get item details by id
  getDetails(id:any) {
    this.note_Ser.getItem(id).subscribe(
      res => {
        this.myform.patchValue({
          description: res.data.description
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

  //after click update items without refresh 
  afterUpdate(){
    this.note_Ser.getAll().subscribe(
      res=>{
        this.items.emit(res.data)
      }
    )
  }
}
