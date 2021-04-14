import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/shard/services/posts.service';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.scss']
})
export class ShowPostsComponent implements OnInit {
  @Input() itemId:any;
  myform!: FormGroup;
  submited:boolean=false;
  
  @Output() items= new EventEmitter<any>();
  
  constructor(private fb:FormBuilder, private post_Ser:PostsService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.build()
    this.getitemDetails(this.itemId)
  }

  //this field is rquired 
  get f(){
    return this.myform.controls
  }

  //build 
  build(){
    this.myform=this.fb.group({
      title:[null, Validators.required],
      description:[null, Validators.required]
    })
  } 
  

  getitemDetails(id:any){
    this.post_Ser.getitem(id).subscribe(
      res=>{
        this.myform.patchValue({
          title: res.title,
          description: res.description
        })
      }
    )
  }


  onSubmit(id:any){
    if(id ===''){
      this.addItem(this.myform.value)
    }else{
      this.updateItem(this.myform.value, id)
    }
  }


  addItem(data:any){
    this.post_Ser.add(data).subscribe(
      res =>{
        this.toaster.success('item add successfuly', 'success');
        this.getitems();
        console.log(res);
      },
      err=>{
        this.toaster.error(err,"Error")
      }
    )
  }


  
  //update
  updateItem(data:any,id:any){
    this.post_Ser.update(data,id).subscribe(
      res=>{
        this.toaster.success('item updated successfuly', 'success');
        this.getitems();
      }
    )
  
  }

 //get items after onSubmite
  getitems(){
    console.log('working');
    this.post_Ser.getAll().subscribe(
      res=>{
        this.items.emit(res)
      }
    )
  }

  
}
