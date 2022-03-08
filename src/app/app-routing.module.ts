import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: SigninSignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
