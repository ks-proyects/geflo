import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatListModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BloquesComponent } from './bloques/bloques.component';
import { BloquesEditComponent } from './bloques-edit/bloques-edit.component';
import { RegisterComponent } from './register/register.component';

const firebaseConfig: any = {
    apiKey: 'AIzaSyBqnISpUrzsVFNrpiz5Dt44eVngRoxk9P8',
    authDomain: 'geflo-eb404.firebaseapp.com',
    databaseURL: 'https://geflo-eb404.firebaseio.com',
    projectId: 'geflo-eb404',
    storageBucket: 'geflo-eb404.appspot.com',
    messagingSenderId: '126734069562'
 };
const appRouter: Routes = [
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'bloques', component: BloquesComponent},
   {path: 'bloquesEdit', component: BloquesEditComponent},
   {path: 'register', component: RegisterComponent}
 ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BloquesComponent,
    BloquesEditComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('main-sw.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(appRouter),
    MatButtonToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
