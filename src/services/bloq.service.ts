import {AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class BloqService{
    constructor(public afDB:AngularFireDatabase,private firestore:AngularFirestore){

    }
    public getBloqs(){
        return this.afDB.list('/bloqs/');
    }
    public getBloq(id: any) {
        return this.afDB.object('/bloqs/' + id);
    }
    public creteBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).set(bloq);
    }
    public editBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).set(bloq);
    }
    public deleteBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).remove();
    }
    createCoffeeOrder(data) {
        return this.firestore.collection('bloqs').add(data);
    }
    getCoffeeOrders(){
        return this.firestore.collection('bloqs').snapshotChanges();
      }
      updateCoffeeOrder(data) {
        return this.firestore.collection('bloqs').doc(data.id).set(data);
        
     }

     deleteCoffeeOrder(data) {
         debugger;
        return this.firestore.collection('bloqs').doc(data.id).delete();
         //this.firestore.doc('bloqs/' + data.id).delete();
        //return this.firestore.collection('bloqs').doc(data.payload.doc.id).delete();
     }
}