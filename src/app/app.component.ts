import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { OuthService } from 'src/services/outh.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
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
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private outhService: OuthService,
    private router: Router,
    private afAuth: AngularFireAuth) {
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
  ngOnInit(): void {
    
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