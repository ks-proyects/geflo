import {
  Component,
  OnInit
} from '@angular/core';
import {
  OuthService
} from 'src/services/outh.service';
import {
  MessagingService
} from '../messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user: any = {};
  constructor(protected outhService: OuthService, private msgService: MessagingService) {}
  ngOnInit() {}
  login() {
      this.outhService.loginWithFacebook().then((result) => {
          this.user = result.user;
          this.msgService.getPermission();
      }).catch((error) => {
          console.log(error);
      });
  }
}