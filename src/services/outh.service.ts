import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({providedIn: 'root'})
export class OuthService {
    constructor(public afDB: AngularFireDatabase,public afAuth: AngularFireAuth){

    }
    loginWithGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    loginWithFacebook() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    loginWithUser(email: string , password: string ) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    logout() {
        return this.afAuth.auth.signOut();
    }
}