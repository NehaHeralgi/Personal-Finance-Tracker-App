import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AlltransactionComponent } from './alltransaction/alltransaction.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent,},
  { path: 'register', component: RegisterComponent },
  { path: 'alltransaction', component: AlltransactionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
