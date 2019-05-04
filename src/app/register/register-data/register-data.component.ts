import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.less']
})
export class RegisterDataComponent implements OnInit {

  showSpinner: any = false;
  user: any = {};
  listaSexo: any = [{id: '1', name: 'Masculino'}, {id: '2', name: 'Femenino'}, {id: '3', name: 'Otro'}];
  listaTipoCuenta: any = [{id: '1', name: 'Personal'}, {id: '2', name: 'Empresarial'}];
  currentUser: any = {};
  constructor(private afAuth: AngularFireAuth , private uUservice: UserService, 
    private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit() {
    this.afAuth.authState.take(1).subscribe(user => {
      this.currentUser = user;
    });
  }
  finalizar() {
    this.showSpinner = true;
    this.uUservice.create({...this.user, id : this.currentUser.uid}).then((resp) => {
      this.snackBar.open('Has finalizado tu registro, ahora ya puedes ingresar!', null, {
        duration: 2000,
      });
      this.router.navigate(['home']);
    }).catch((error)=>{
      this.snackBar.open(error.message, null, {
        duration: 2000,
      });
    }).finally(() => {
      this.showSpinner = false;
    });
  }

}
