import {Component, OnInit} from '@angular/core';
import {OuthService} from 'src/services/outh.service';
import {MessagingService} from '../messaging.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: any = '';
  password: any = '';
  showSpinner: any = false;
  constructor(protected outhService: OuthService, private msgService: MessagingService, private router: Router, 
    private snackBar:MatSnackBar ) {}
  ngOnInit() {}
  register(){
    this.router.navigate(['/register']);
  }
  login(opt) {
      this.showSpinner = true;
      switch (opt) {
        case 'FAC':
            this.outhService.loginWithFacebook().then((result) => {
              this.showSpinner = false;
              this.msgService.getPermission();
              this.router.navigate(['/home']);
            }).catch((error) => {
                console.log(error);
            });
            break;
        case 'GOG':
            this.outhService.loginWithGoogle().then((result) => {
              this.showSpinner = false;
              this.msgService.getPermission();
              this.router.navigate(['/home']);
            }).catch((error) => {
                console.log(error);
            });
            break;
        case 'USP':
            this.outhService.loginWithUser(this.username, this.password).then((result) => {
              this.showSpinner = false;
              this.msgService.getPermission();
              this.router.navigate(['/home']);
            }).catch((error) => {
                this.snackBar.open(error.message, null, {
                  duration: 2000,
                });
                this.showSpinner = false;
            });
            break;
        default:
          break;
      }
  }
}