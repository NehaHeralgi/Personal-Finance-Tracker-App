import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AlltransactionComponent } from './alltransaction/alltransaction.component';
import { ReportsComponent } from './reports/reports.component';
import { CategorySpendingReportComponent } from './reports/category-spending-report/category-spending-report.component';
import { IncomeExpenseReportComponent } from './reports/income-expense-report/income-expense-report.component';
import { MonthlySpendingReportComponent } from './reports/monthly-spending-report/monthly-spending-report.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent,},
  { path: 'register', component: RegisterComponent },
  { path: 'alltransaction', component: AlltransactionComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'reports/category-spending-report', component: CategorySpendingReportComponent },
  { path: 'reports/income-expense-report', component: IncomeExpenseReportComponent },
  { path: 'reports/monthly-spending-report', component: MonthlySpendingReportComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
