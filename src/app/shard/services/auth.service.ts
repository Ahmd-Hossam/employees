import { Injectable } from '@angular/core';
import {api as env} from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { User } from '../interfaces/user'
import { catchError, map } from 'rxjs/operators';
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
    return this.http.post<any>(`${env}/auth/register`,data)
    .pipe(
      catchError(this.handleError)
      )
  }


  login(data:any){
    return this.http.post<any>(`${env}/auth/login`,data)
  }

  getToken() {
    return localStorage.getItem('access_token');
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  
  Logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['../auth']);
      this.userSubject.next(null)
      this.toaster.success('Logout Successfully', "logout")
    }
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      this.toaster.error(error.error.message,'client-side error ')
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.toaster.error(error.error.message,'server-side error ')
    }
    return throwError(msg);
  }

  
}
