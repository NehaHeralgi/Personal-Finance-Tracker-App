import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

  export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'add-transaction', component: AddTransactionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

