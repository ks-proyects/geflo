import { Component, OnInit } from '@angular/core';
import { OuthService } from 'src/services/outh.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  email: any = '';
  password: any = '';
  passwordConfirm: any = '';
  showSpinner: any = false;
  constructor(protected outhService: OuthService,private router: Router, 
    private snackBar:MatSnackBar) { }
  ngOnInit() {
  }
  register(opt) {
    this.showSpinner = true;
    switch (opt) {
        case 'FAC':
            this.outhService.registerWithFacebook().then((result) => {
                this.router.navigate(['registerData']);
            }).catch((error) => {
                console.log(error);
            });
            break;
        case 'GOG':
            this.outhService.registerWithGoogle().then((result) => {
                this.showSpinner = false;
                this.router.navigate(['registerData']);
            }).catch((error) => {
                console.log(error);
            });
            break;
        case 'USP':
            this.outhService.registerWithUser(this.email, this.password).then((result) => {
                this.showSpinner = false;
                this.router.navigate(['registerData']);
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
