import { Injectable } from '@angular/core';
import {environment as env} from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, Subject, throwError } from 'rxjs';
import { User } from '../interfaces/user'
import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject:BehaviorSubject<any>
  user:Observable<any>
 

  constructor(private http:HttpClient, private router:Router, private toaster:ToastrService) { 
    this.userSubject= new BehaviorSubject<any>(localStorage.getItem('access_token'))
    this.user=this.userSubject.asObservable()
  }
  
  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  register(data:any){
    return this.http.post<any>(`https://api-nodejs-todolist.herokuapp.com/user/register`,data)
  }


  login(data:any){
    return this.http.post<any>(`https://api-nodejs-todolist.herokuapp.com/user/login`,data)
  }

  postimg(img:any){
    return this.http.post<any>(`https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,img)
  }

  getimg(id:any){
    return this.http.get<any>(`https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`)
  }


  getToken() {
    return localStorage.getItem('access_token');
  }
  

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }


  Logout() {
    localStorage.removeItem('user_data')
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['../auth']);
      this.userSubject.next(null)
      this.toaster.success('Logout Successfully', "logout")
    }
  }

  delate_User(){
    return this.http.delete<any>(`https://api-nodejs-todolist.herokuapp.com/user/me`)
  }


  //shard 
    private subject = new Subject<any>();
    sendClickEvent() {
      this.subject.next();
    }
    getClickEvent(): Observable<any>{ 
      return this.subject.asObservable();
    }



  
 
  

  
  
}
function httpOptionsPlain<T>(arg0: string, img: any, httpOptionsPlain: any) {
  throw new Error('Function not implemented.');
}

