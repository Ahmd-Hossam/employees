import { Injectable } from '@angular/core';
import { environment as env} from '../../../environments/environment'
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   
  constructor(private auth_ser:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.auth_ser.getToken()
    if(request.url.startsWith(env.url_api)){
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}


 /*
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.startsWith(env.url_api)){
      const authToken = this.auth_ser.getToken()
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
    }
    return next.handle(request);
  }
  */
