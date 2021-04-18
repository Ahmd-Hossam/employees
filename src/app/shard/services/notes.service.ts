import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }

  //get All notes
  getAll(){
    return this.http.get<any>(`${env.api}/task`)
  }
  //oneitem by id 
  getItem(id:any){
    return this.http.get<any>(`${env.api}/task/${id}`)
  }
 
  //add data
  add(data:any){
    return this.http.post<any>(`${env.api}/task`,data)
  }
  //update data
  update(id:any, data:any){
    return this.http.put<any>(`${env.api}/task/${id}`,data)
  }
  //delate item
  delate(id:any){
    return this.http.delete(`${env.api}/task/${id}`)
  }

}
