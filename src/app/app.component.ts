import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {BloqService} from '../services/bloq.service';
import {OuthService} from '../services/outh.service';
import {MatSnackBar} from '@angular/material';
import { MessagingService } from './messaging.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  user:any={}
  message:any={}
  token:any={}
  networkMode = 'online';
  tasksCollection: AngularFirestoreCollection<{}>;
  tasks: Observable<{}[]>;
  taskDoc: AngularFirestoreDocument<{}>;
  constructor(private swUpdate:SwUpdate,private serviceBloq:BloqService,private snackBar: MatSnackBar,private outhService: OuthService,private msgService:MessagingService){
  }
  ngOnInit():void{
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(async () => {
          if(confirm("Existe una nueva versión desea actualizar?")){
            window.location.reload();
          }
        });
    }
    this.serviceBloq.getCoffeeOrders().subscribe(data => {
      this.bloqs = data.map(e => {
        return {id: e.payload.doc.id,...e.payload.doc.data()} as {};
      });
    });
  }
  saveBloq(){
    if(!this.bloq.id){
      this.bloq.fecha=Date.now();
      this.serviceBloq.createCoffeeOrder(this.bloq);
      this.snackBar.open("Guardado", null, {
        duration: 2000,
      });
    }else{
      this.serviceBloq.updateCoffeeOrder(this.bloq);
      this.snackBar.open('Actualizado', null, {
        duration: 2000,
      });
    }
    this.bloq = {};
  } 
  selBloq(item){
    this.bloq=item;
  }
  selBloqNew(){
    this.bloq={};
  }
  inactivar(item){
    if(confirm('Desea Eliminar el Bloque?')) {
      this.serviceBloq.deleteCoffeeOrder(item);
      this.bloq = {};
      this.snackBar.open('Eliminado', null, {
        duration: 2000,
      });
    }
  }
  login(){
    this.outhService.loginWithFacebook().then((result) => {
        var token = result.credential.providerId;
        var user = result.user;
        this.user=user;
        this.msgService.getPermission();
    }).catch((error) => {
        console.log(error);
    });
  }
  logout(){
    this.outhService.logout().then((result) => {
      console.log('Se salio de la seccion correctamente!');
      console.log(result);
    }).catch((error) => {
        console.log(error);
    });
  }
}
