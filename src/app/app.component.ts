import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {OuthService} from '../services/outh.service';
import {MatSnackBar} from '@angular/material';
import {MessagingService} from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Geflo';
  viewMenu: any = false;
  constructor(
    private swUpdate: SwUpdate,private snackBar: MatSnackBar, protected outhService: OuthService, private msgService: MessagingService) {}
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
  }
  logout() {
      this.outhService.logout().then((result) => {
        this.snackBar.open('Se cerro la sessión', null, {
          duration: 2000,
        });
      }).catch((error) => {
          console.log(error);
      });
  }
}