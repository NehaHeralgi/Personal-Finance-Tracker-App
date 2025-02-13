import { Component, CUSTOM_ELEMENTS_SCHEMA, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    DashboardChartsComponent,MatIcon,MatCard,NgxChartsModule,GridsterModule,ReactiveFormsModule  ,MatSelectModule,MatFormFieldModule  
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})


export class DashboardComponent implements OnInit, OnChanges {
  gridOptions!: GridsterConfig;
  profileWidget!: GridsterItem;
  recentTransactionsWidget!: GridsterItem;
  addTransactionWidget!: GridsterItem;
  chartsWidget!: GridsterItem;
  showTable = true;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'category', 'amount', 'description', 'actions'];
  addTransactionForm!: FormGroup;
  categories: any[] = [];
  currentTransaction: any = null;
  
  constructor(
    private transactionService: CommonService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.gridOptions = {
      draggable: { enabled: true },
      resizable: { enabled: true },
      gridType: 'fit',
      pushItems: true,
      swap: false,
      displayGrid: 'always',
      margin: 10,
    };

    this.profileWidget = { cols: 2, rows: 1, y: 0, x: 2, fixed: true }; 
    this.recentTransactionsWidget = { cols: 2, rows: 3, y: 1, x: 2 }; 
    this.addTransactionWidget = { cols: 2, rows: 3, y: 1, x: 0 }; 
    this.chartsWidget = { cols: 4, rows: 2, y: 4, x: 0 };

    this.loadDashboardData();
        this.addTransactionForm = this.fb.group({
         amount: ['', [Validators.required, Validators.min(1)]],
         category: ['', Validators.required],
         description: ['', Validators.required],
         isExpense: [true, Validators.required] // Default is Expense (true)
       });
    this.transactionService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        if (this.currentTransaction) {
          // If editing, pre-fill the form
          this.addTransactionForm.patchValue({
            amount: this.currentTransaction.amount,
            category: this.currentTransaction.categoryId,
            description: this.currentTransaction.description,
            isExpense: this.currentTransaction.isExpense
          });
        }
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  loadDashboardData() {
    debugger
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.calculateSummary();
    });
  }

  calculateSummary() {
    this.totalIncome = this.transactions.filter((t) => !t.isExpense).reduce((sum, t) => sum + t.amount, 0);
    this.totalExpense = this.transactions.filter((t) => t.isExpense).reduce((sum, t) => sum + t.amount, 0);
    this.balance = this.totalIncome - this.totalExpense;
  }

  toggleView() {
    this.showTable = !this.showTable;
  }

  openTransactionForm(transaction: any = null) {
    if (transaction) {
      this.currentTransaction = transaction;  // Set transaction for editing
    } else {
      this.currentTransaction = null;  // Clear if adding new
    }
    this.addTransactionForm.reset();  // Reset the form
  }

  onSubmit() {
    if (this.addTransactionForm.invalid) {
      return;
    }

    const transactionData = this.addTransactionForm.value;
    if (this.currentTransaction) {
      // If editing, update the transaction
      this.transactionService.updateTransaction(transactionData).subscribe(() => {
        this.loadDashboardData();
        this.currentTransaction = null;
      });
    } else {
      // If adding, create a new transaction
      this.transactionService.addTransaction(transactionData).subscribe(() => {
        this.loadDashboardData();
      });
    }
  }

  deleteTransaction(transactionId: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(() => {
        this.loadDashboardData();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

    //@Input() transactions: any[] = [];
  
    // Pie chart data (Expense vs Income)
    pieChartData: any[] = [];
  
    // Bar chart data (Monthly Spending Trend)
    barChartData: any[] = [];
  
    // Line chart data (Balance Growth Over Time)
    lineChartData: any[] = [];
  
    // Correctly typed view
    view: [number, number] = [700, 400]; // Default size
  
    // Define chart options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showLabels = true;
    explodeSlices = false;
    doughnut = false;
  
    ngOnChanges(changes: SimpleChanges) {
      debugger
      if (changes['transactions']) {
        this.updateCharts();
      }
    }
  
    updateCharts() {
      // Pie chart (Expense vs Income)
      debugger
      const expense = this.transactions
        .filter((t) => t.isExpense)
        .reduce((sum, t) => sum + t.amount, 0);
      const income = this.transactions
        .filter((t) => !t.isExpense)
        .reduce((sum, t) => sum + t.amount, 0);
  
      this.pieChartData = [
        { name: 'Expenses', value: expense },
        { name: 'Income', value: income },
      ];
  
      // Bar chart (Monthly Spending Trend)
      const monthlyData = this.calculateMonthlySpendingTrend();
      this.barChartData = monthlyData;
  
      // Line chart (Balance Growth Over Time)
      this.lineChartData = this.calculateBalanceGrowth();
      console.log("Updated Line Chart Data:", this.lineChartData);
    }
  
    calculateMonthlySpendingTrend() {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const data = months.map((month, index) => {
        const monthData = this.transactions.filter(
          (t) => new Date(t.date).getMonth() === index
        );
        const monthlyExpense = monthData
          .filter((t) => t.isExpense)
          .reduce((sum, t) => sum + t.amount, 0);
        return { name: month, value: monthlyExpense };
      });
      return data;
    }
  
    calculateBalanceGrowth() {
      if (!this.transactions || this.transactions.length === 0) {
        return [];
      }
    
      let balance = 0;
      let seriesData = this.transactions.map((t) => {
        balance += t.isExpense ? -t.amount : t.amount;
        return { name: new Date(t.date).toISOString().split("T")[0], value: balance };
      });
    
      return [
        {
          name: "Balance",
          series: seriesData
        }
      ];
    }
    openProfileModal() {
          const dialogRef = this.dialog.open(ProfileModalComponent, {
            width: '300px'
          });
      
          dialogRef.afterClosed().subscribe(() => {
            // Optional: Any action after modal is closed
          });
        }
        
}