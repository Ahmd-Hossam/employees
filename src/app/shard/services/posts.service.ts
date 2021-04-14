import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api as env } from '../../../environments/environment'
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  //get all posts
  getAll() {
    return this.http.get<any>(`${env}/posts`)
  }

   //get item
   getitem(id:any){
    return this.http.get<any>(`${env}/posts/${id}`)
  }

  //delate
  delate(id:any){
    return this.http.delete<any>(`${env}/posts/${id}`)
  }


  //add posts
  add(data:any){
    return this.http.post<any>(`${env}/posts`,data)
  }

 

  //edit
  update(data:any, id:any){
    return this.http.put<any>(`${env}/posts/${id}`, data )
  }
}
