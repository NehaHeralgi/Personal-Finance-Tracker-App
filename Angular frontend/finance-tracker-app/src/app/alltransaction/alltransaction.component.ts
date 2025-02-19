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
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-alltransaction',
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
      TableModule,
      FormsModule,
      DropdownModule,
      CalendarModule,
      InputTextModule,
      CardModule
      
    ],
  templateUrl: './alltransaction.component.html',
  styleUrl: './alltransaction.component.css'
})
export class AlltransactionComponent {
  showTable = true;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'category', 'amount', 'description', 'actions'];
  categories: any[] = [];
  globalFilter: string = '';
  dateFilter: any;
  categoryFilter: string = '';
  amountFilter: number | null = null;
  descriptionFilter: string = '';

  selectedTransaction: any = null;

    constructor(
      private transactionService: CommonService,
      private authService: AuthService,
      private router: Router,
      private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadCategories();
  }

  loadDashboardData() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.calculateSummary();
    });
  }
  loadCategories() {
    this.transactionService.getCategories().subscribe((data) => {
      this.categories = data;
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

  applyFilter() {
    this.transactions = this.transactions.filter(transaction => {
      return (
        (!this.dateFilter || transaction.date === this.dateFilter) &&
        (!this.categoryFilter || transaction.categoryName === this.categoryFilter) &&
        (!this.amountFilter || transaction.amount == this.amountFilter) &&
        (!this.descriptionFilter || transaction.description.toLowerCase().includes(this.descriptionFilter.toLowerCase()))
      );
    });
  }

  printTable() {
    const tableElement = document.querySelector('.p-datatable table'); // Target the actual table inside p-table
    if (tableElement) {
      let newWin = window.open('', '', 'width=800,height=600');
      newWin?.document.write(`
        <html>
        <head>
          <title>Print Transactions</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>All Transactions</h2>
          ${tableElement.outerHTML} <!-- Extracts the actual table -->
        </body>
        </html>
      `);
      newWin?.document.close();
      newWin?.print();
    } else {
      console.error("Table not found! Make sure p-table is properly rendered.");
    }
  }
  

  downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Transactions.xlsx');
  }

}
