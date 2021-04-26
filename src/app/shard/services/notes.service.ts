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
    return this.http.get<any>(`https://api-nodejs-todolist.herokuapp.com/task`)
  }
  //oneitem by id 
  getItem(id:any){
    return this.http.get<any>(`https://api-nodejs-todolist.herokuapp.com/task/${id}`)
  }
  //get by pagination
  getpagination(){  //?limit=5&skip=5`)
    return this.http.get<any>(`https://api-nodejs-todolist.herokuapp.com/task?limit=100`)
  }
  //add data
  add(data:any){
    return this.http.post<any>(`https://api-nodejs-todolist.herokuapp.com/task`,data)
  }
  //update data
  update(id:any, data:any){
    return this.http.put<any>(`https://api-nodejs-todolist.herokuapp.com/task/${id}`,data)
  }
  //delate item
  delate(id:any){
    return this.http.delete(`https://api-nodejs-todolist.herokuapp.com/task/${id}`)
  }

}
