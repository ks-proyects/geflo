import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
export interface Item { name: string; price: number }

@Injectable({providedIn: 'root'})
export class BloqService{
    constructor(private afs: AngularFirestore) {
    }
    createCoffeeOrder(data) {
     this.afs.collection('bloqs').add(data);
    }
    getCoffeeOrders(){
        return this.afs.collection('bloqs').snapshotChanges();
    }
    updateCoffeeOrder(data) {
        this.afs.collection('bloqs').doc(data.id).set(data);
    }
    deleteCoffeeOrder(data) {
        this.afs.collection('bloqs').doc(data.id).delete();
    }
}