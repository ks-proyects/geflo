import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BloquesComponent } from './bloques/bloques.component';
import { BloquesEditComponent } from './bloques-edit/bloques-edit.component';
import { RegisterComponent } from './register/register.component';
import { RegisterDataComponent } from './register/register-data/register-data.component';

const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'bloques', component: BloquesComponent},
   {path: 'bloquesEdit', component: BloquesEditComponent},
   {path: 'register', component: RegisterComponent},
   {path: 'registerData', component: RegisterDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
