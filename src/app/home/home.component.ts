import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  message:any = {};
  constructor(private msgService:MessagingService) { }
  ngOnInit() {
    this.message = this.msgService.currentMessage;
  }
}
