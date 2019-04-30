import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {BloqService} from '../services/bloq.service';
import {OuthService} from '../services/outh.service';
import {MatSnackBar} from '@angular/material';
import { MessagingService } from './messaging.service';
import * as firebase from 'firebase';

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
  constructor(private swUpdate:SwUpdate,private serviceBloq:BloqService,private snackBar: MatSnackBar,private outhService: OuthService,private msgService:MessagingService){
    firebase.firestore().enablePersistence()
      .then(function() {
          // Initialize Cloud Firestore through firebase
          var db = firebase.firestore();
      })
      .catch(function(err) {
          if (err.code == 'failed-precondition') {
              // Multiple tabs open, persistence can only be enabled
              // in one tab at a a time.
              // ...
          } else if (err.code == 'unimplemented') {
              // The current browser does not support all of the
              // features required to enable persistence
              // ...
          }
      });
    navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';

    this.serviceBloq.getBloqs().valueChanges().subscribe((fbbloqs)=>{
      this.bloqs=fbbloqs;
    })
  }
  ngOnInit():void{
    alert('init')
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage
    if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(async () => {
          if(confirm("Existe una nueva versión desea actualizar?")){
            window.location.reload();
          }
        });
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
  inactivar(item){
    if(confirm("Desea Eliminar el Bloque?")){
      this.serviceBloq.deleteBloq(item).then(()=>{
        this.snackBar.open("Eliminado", null, {
          duration: 2000,
        });
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
