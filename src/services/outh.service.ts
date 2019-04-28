import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({providedIn: 'root'})
export class OuthService{
    constructor(public afDB:AngularFireDatabase,public afAuth:AngularFireAuth){

    }
    loginWithFacebook(){
        var proveedor=new firebase.auth.FacebookAuthProvider();
        return this.afAuth.auth.signInWithPopup(proveedor);
    }
    logout(){
        return this.afAuth.auth.signOut();
    }
}