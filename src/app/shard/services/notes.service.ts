import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api as env} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }


  //get All notes
  getAll(){
    return this.http.get<any>(`${env}/notes`)
  }
  //oneitem
  getItem(id:any){
    return this.http.get<any>(`${env}/notes/${id}`)
  }
  //add data
  add(data:any){
    return this.http.post<any>(`${env}/notes`,data)
  }
  //update data
  update(id:any, data:any){
    return this.http.put<any>(`${env}/notes/${id}`,data)
  }
  //delate item
  delate(id:any){
    return this.http.delete(`${env}/notes/${id}`)
  }


}
