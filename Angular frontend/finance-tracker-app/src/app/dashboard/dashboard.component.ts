import { Component,ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { MatButtonModule } from '@angular/material/button';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    DashboardChartsComponent,MatIcon,MatCard,MatToolbarModule,SidebarModule,ButtonModule,AvatarModule
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
  displayedColumns: string[] = ['date', 'category', 'amount', 'description', 'actions'];

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

  openTransactionModal() {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.loadDashboardData();
      }
    });
  }

  editTransaction(transaction: any) {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edit') {
        this.loadDashboardData();
      }
    });
  }

  deleteTransaction(transactionId: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(() => {
        this.loadDashboardData();
      });
    }
  }
  openProfileModal() {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      // Optional: Any action after modal is closed
    });
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

}
