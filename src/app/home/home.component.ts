import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  message: any = {};
  currentUser: any = {};
  constructor(private msgService: MessagingService, private afAuth: AngularFireAuth) {
  }
  ngOnInit() {
    this.afAuth.authState.take(1).subscribe(user => {
      this.currentUser = user;
    });
    this.message = this.msgService.currentMessage;
  }
}
