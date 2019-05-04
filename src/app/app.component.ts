import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {OuthService} from '../services/outh.service';
import {MatSnackBar} from '@angular/material';
import {MessagingService} from './messaging.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Geflo';
  viewMenu: any = false;
  currentUser: any = null;
  constructor(
    private swUpdate: SwUpdate, private snackBar: MatSnackBar, protected outhService: OuthService, private msgService: MessagingService, 
    private afAuth: AngularFireAuth,
    private router: Router) {}
  ngOnInit(): void {
      this.msgService.getPermission();
      this.msgService.receiveMessage();
      if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe(async () => {
              if (confirm('Existe una nueva versión desea actualizar?')) {
                  window.location.reload();
              }
          });
      }
      this.afAuth.authState.take(1).subscribe(user => {
        this.currentUser = user;
      });
  }
  logout() {
      this.outhService.logout().then((result) => {
        this.snackBar.open('Se cerro la sessión', null, {
          duration: 2000,
        });
        this.router.navigate(['/home']);
      }).catch((error) => {
          console.log(error);
      });
  }
}