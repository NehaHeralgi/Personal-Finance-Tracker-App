import { Component,ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { MatButtonModule } from '@angular/material/button';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Sidebar } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    DashboardChartsComponent,
    MatIcon,MatCard,
    MatToolbarModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ToolbarModule,
    RouterModule,
    NavbarComponent,
    CardModule,
    TableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showTable = true;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'category', 'amount', 'description'];

  constructor(
    private transactionService: CommonService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.calculateSummary();
    });
  }

  calculateSummary() {
    this.totalIncome = this.transactions
      .filter((t) => !t.isExpense)
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpense = this.transactions
      .filter((t) => t.isExpense)
      .reduce((sum, t) => sum + t.amount, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }

  toggleView() {
    this.showTable = !this.showTable;
  }

}
