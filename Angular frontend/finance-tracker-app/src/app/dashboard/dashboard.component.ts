import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  transactions: any[] = [];

  displayedColumns: string[] = ['date', 'category', 'amount', 'description','actions'];

  constructor(
    private authService: AuthService,
    private transactionService: CommonService,
    public router: Router,
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
    // Calculate total income based on transactions marked as 'income'
    this.totalIncome = this.transactions
      .filter((t) => t.isExpense === false) // Assuming `isExpense` is a boolean flag
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate total expenses based on transactions marked as 'expense'
    this.totalExpense = this.transactions
      .filter((t) => t.isExpense === true) // Assuming `isExpense` is a boolean flag
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate the balance (Income - Expense)
    this.balance = this.totalIncome - this.totalExpense;
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
  // Edit Transaction Method
  editTransaction(transaction: any) {
    debugger
    console.log('Editing Transaction:', transaction); 
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: transaction // Pass the transaction data to the modal for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.loadDashboardData();  // Refresh the transaction list after edit
      }
    });
  }

  // Delete Transaction Method with Confirmation Dialog
  deleteTransaction(transactionId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      this.transactionService.deleteTransaction(transactionId).subscribe(() => {
        this.loadDashboardData(); // Refresh the transaction list
      });
    }}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
