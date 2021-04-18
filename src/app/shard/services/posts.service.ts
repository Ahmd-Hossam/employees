import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  //get all posts
  getAll() {
    return this.http.get<any>(`${env.url_api}/posts`)
  }

   //get item
   getitem(id:any){
    return this.http.get<any>(`${env.url_api}/posts/${id}`)
  }

  //delate
  delate(id:any){
    return this.http.delete<any>(`${env.url_api}/posts/${id}`)
  }


  //add posts
  add(data:any){
    return this.http.post<any>(`${env.url_api}/posts`,data)
  }

 

  //edit
  update(data:any, id:any){
    return this.http.put<any>(`${env.url_api}/posts/${id}`, data )
  }
}
