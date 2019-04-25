import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {BloqService} from '../services/bloq.service';

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
  constructor(private swUpdate:SwUpdate,private serviceBloq:BloqService){}
  ngOnInit():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        window.location.reload();
      })
    }
  }
  saveBloq(){
    this.bloq.id=Date.now();
    console.log(this.bloq);
    this.serviceBloq.creteBloq(this.bloq).then(()=>{
      this.bloq={};
      alert('Guardado')
    });
  } 
}
