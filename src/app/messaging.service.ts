import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject({});
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}
  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) {return; }
      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        return this.messaging.getToken()
      })
      .then(token => {
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });

    }
}
