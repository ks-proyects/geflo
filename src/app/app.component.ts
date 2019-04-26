import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {BloqService} from '../services/bloq.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent  implements OnInit{
  title = 'geflo';
  panelOpenState = false;
  workerSupervisores:any=[{id: 1 , nombres : 'Freddy Castillo'}, { id : 2, nombres: 'Dayana Cualchi'}]
  bloq:any={}
  bloqs:any=[]
  constructor(private swUpdate:SwUpdate,private serviceBloq:BloqService,private snackBar: MatSnackBar){
    this.serviceBloq.getBloqs().valueChanges().subscribe((fbbloqs)=>{
      this.bloqs=fbbloqs;
    })
  }
  ngOnInit():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        window.location.reload();
      })
    }
  }
  saveBloq(){
    if(!this.bloq.id){
    this.bloq.id=Date.now();
    this.serviceBloq.creteBloq(this.bloq).then(()=>{
      this.bloq={};
      this.snackBar.open("Guardado", null, {
        duration: 2000,
      });
    });
  }else{
    this.serviceBloq.editBloq(this.bloq).then(()=>{
      this.bloq={};
      this.snackBar.open("Actualizado", null, {
        duration: 2000,
      });
    });
  }
  } 
  selBloq(item){
    this.bloq=item;
  }
}
