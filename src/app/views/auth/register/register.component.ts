import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myform!:FormGroup;
  submited: boolean = false
  loading: boolean = false;
  ShowPassord: boolean = false

  constructor(private auth_ser:AuthService, private fb:FormBuilder, private toastr:ToastrService, private router:Router) {
      // redirect to home if already logged in
      if (this.auth_ser.currentUserValue) { 
        this.router.navigate(['/']);
      }
   }

  ngOnInit(): void {
    this.build();
  }
  


  build(){
    this.myform= this.fb.group({
      name:['', Validators.required],
      email:['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      password:['', Validators.compose([
        Validators.required,
        //Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/)
      ])],
      age:['',Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.myform.controls; }

  register(){
    this.submited = true;
    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }
    this.loading = true;
    this.auth_ser.register(this.myform.value).subscribe(
      res=>{
        console.log(res.user);
       // localStorage.setItem('access_token',res.access_token)
        this.toastr.success("rigisterd successfuly", "Success")
        this.router.navigate(['../auth'])
      },
      err=>{
        this.toastr.error("This email is already in use! ", "Error")
      }
    )
  }

  showPassword() {
      this.ShowPassord = !this.ShowPassord
  }
}
