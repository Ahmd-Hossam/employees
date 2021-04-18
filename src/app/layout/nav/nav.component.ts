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
 
  constructor(private fb:FormBuilder, private auth:AuthService, private modal:NgbModal, private toaster:ToastrService, private router:Router) { }

  ngOnInit(): void { 
    //this.build()
    let user_data:any=localStorage.getItem('user_data') //only json data {"name":"admin"}
    let obj = JSON.parse(user_data);  // covert json to object {name:"admin"}
    this.userdata=Array.of(obj); // make it array of object to can loop it in </>

    //is loggedin
    this.isloggedin()

    //to make  navbar up  when click
    $(document).on('click',function(){
      $('.collapse').collapse('hide');
    })

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

/*

  build(){
    this.myform=this.fb.group({
      profile: ['']
    })
  }


  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myform.get('profile').setValue(file);
    }
  
  }
  onSubmit() {
    const formData = new FormData();
  
    this.auth.postimg(formData).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
*/

}
