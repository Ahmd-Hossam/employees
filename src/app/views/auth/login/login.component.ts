import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavComponent } from 'src/app/layout/nav/nav.component';
import { AuthService } from 'src/app/shard/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  myform!: FormGroup;
  submited: boolean = false
  loading :boolean = false;
  returnUrl:string=''
  ShowPassord: boolean = false;

 
  constructor(private auth_Ser: AuthService, private toaster: ToastrService, private router:Router) { 
    // redirect to home if already logged in
    if (this.auth_Ser.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }
  
  

  ngOnInit(): void {
    this.biuld();
  }



  biuld() {
    this.myform = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/)        
      ]))
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.myform.controls; }


  login() {
    this.submited = true;
    // stop here if form is invalid
    
    if (this.myform.invalid) {
      return;
    }
    this.loading = true;
    this.auth_Ser.login(this.myform.value).subscribe(
      res=>{
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('user_data', JSON.stringify(res.user))//convert object to jason string
        this.toaster.success("Login successfuly", "Success")
        this.router.navigate(['../user/notes']).then(
  
        )
      },
      err=>{
        this.toaster.error(" Check your Email or password ", err.error)
      }
    )
  }

  showPassword() {
    this.ShowPassord = !this.ShowPassord
  } 

}
