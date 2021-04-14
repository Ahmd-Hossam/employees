import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shard/services/notes.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {
  items:any[]=[]
  itemId:any
  constructor( private notes_ser:NotesService, private modal:NgbModal, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.AllItems()
  }

  //get all items
  AllItems(){
    this.notes_ser.getAll().subscribe(
      res=>{
        this.items=res;
        console.log(res);
        
      }
    )
  }


  //show popup
  popup(popup:any, id:any){
    this.itemId=id,
    this.modal.open(popup)
  }

  //delate iteme
  delateItem(delate:any, id:any){
    this.modal.open(delate).result.then(res =>{
      this.notes_ser.delate(id).subscribe(
        respons=>{
          this.toastr.success('item delated successfuly', 'succussfuly');
          this.AllItems()
        }
      )
      }
    )
  }


  update(updateitmes:any){
    this.items=updateitmes;
    this.modal.dismissAll()
  }


}
