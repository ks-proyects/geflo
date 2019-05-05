import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { BloquesComponent } from './component/bloques/bloques.component';
import { BloquesEditComponent } from './component/bloques-edit/bloques-edit.component';
import { RegisterComponent } from './component/register/register.component';
import { RegisterDataComponent } from './component/register-data/register-data.component';

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
