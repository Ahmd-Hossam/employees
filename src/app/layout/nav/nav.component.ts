import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  userdata:any[]=[]
  myform!:FormGroup
 user_id:any
  constructor(private fb:FormBuilder, private auth:AuthService, private modal:NgbModal, private toaster:ToastrService, private router:Router) { }

  ngOnInit(): void { 
    this.build()//build
    this.isloggedin()//is loggedin

    let user_data:any=localStorage.getItem('user_data') //only json data {"name":"admin"}
    let obj = JSON.parse(user_data);  // covert json to object {name:"admin"}
    this.userdata=Array.of(obj); // make it array of object to can loop it in </>

    //to make  navbar up  when click
    $(document).on('click',function(){
      $('.collapse').collapse('hide');
    })
    //send id
    for(let i of this.userdata){
        this.user_id=i._id 
    }
  
  }


   //open modal
   user(profile:any){
    this.modal.open(profile)
  }

  //check 
  isloggedin(){
    if (this.auth.isLoggedIn !== true) {
      this.isLoggedIn=false
    }else{
      this.isLoggedIn=true
    }
  }

  //to hide and show itmes (user icon || login and register)
  burgur(){
     this.isloggedin()
  }
 

  //get img
  getimg(){
    this.auth.getimg(this.user_id).subscribe(
      res=>{
        console.log(res.url);
      }
    )
  }
  
  //logout
  logout(){ 
    this.auth.Logout()
    this.modal.dismissAll()
    //is loggedin
    this.isloggedin()
  }

  //delate acount 
  delate(){
    this.auth.delate_User().subscribe(
      res=>{
        console.log(res);
        this.toaster.success('acount delated successfuly', 'success')
        this.logout();
       
        this.router.navigate(['../auth'])
      },
      err=>{
        this.toaster.error(err, "errorrrrr")
      }
    )
  }



  build(){
    this.myform=this.fb.group({
      avatar: ['']
    })
  }



  file:any
  onFileSelect(event:any) {
      this.file = event.target.files[0];
  }
  onSubmit() {
    let formData = new FormData();
    formData.append('avatar', this.file);
    this.auth.postimg(formData).subscribe(
     res =>{
       console.log(res);
       this.toaster.success('تم تحميل الصوره بنجاح')
     },err=>{
       console.log(err);
       this.toaster.error('خطا في تحميل الصوره')
     })
    }


}
