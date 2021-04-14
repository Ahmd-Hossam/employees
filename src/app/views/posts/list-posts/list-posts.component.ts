import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shard/services/posts.service';
//configration
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts: any [] = [];
  itemid:any

  constructor(private posts_ser: PostsService, config: NgbModalConfig, private modalService:NgbModal, private toastr:ToastrService) {
    // customize default values of modals used by this component tree
    //اضافة مش اجبارية 
    config.backdrop = 'static';
    config.keyboard = true;
   }

  ngOnInit(): void {
    this.getAll()
  }


  //get all data
  getAll() {
    this.posts_ser.getAll().subscribe(
      res => {
        this.posts = res;
        console.log(res);
        
      }
    )
  }


 //add or edite item 
 add(add_edit:any,id:any){
  this.modalService.open(add_edit).result.then(result =>{},
  reason =>{
    console.log(reason);
  });
  this.itemid=id;
}


  //delete
  delate(content:any,id:any) {
    this.modalService.open(content).result.then(res=>{
      this.posts_ser.delate(id).subscribe(
        res=>{
          this.toastr.success('item delated successfuly', 'susscus')
          console.log(res);
          this.getAll()
        },
        err=>{
          this.toastr.error(err,"Error")
        }
      )
    })
  }


  //for update
  myupdate(updatedItems:any){
    this.posts=updatedItems;
    this.modalService.dismissAll()
  }

  
}
