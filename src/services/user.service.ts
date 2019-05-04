import { AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(public afs: AngularFirestore) {

    }
    create(user){
      return this.afs.collection('users').add(user);
    }
}


