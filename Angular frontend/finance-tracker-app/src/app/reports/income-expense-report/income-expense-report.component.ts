import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-income-expense-report',
  standalone: true,
  imports: [NavbarComponent,TableModule,NgxChartsModule,ChartModule,ButtonModule,CardModule],
  templateUrl: './income-expense-report.component.html',
  styleUrl: './income-expense-report.component.css'
})
export class IncomeExpenseReportComponent {

  transactions: any[] = [];
  summaryData: any[] = [];
  chartData: any;
  showChart = false;
  toggleButtonLabel = 'View Chart';
  constructor(private transactionService: CommonService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.generateSummary();
      this.prepareChartData();
    });
  }

  generateSummary() {
    const summaryMap = new Map<string, { income: number; expense: number }>();

    this.transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString('en-US', { month: 'long' });

      if (!summaryMap.has(month)) {
        summaryMap.set(month, { income: 0, expense: 0 });
      }

      const currentSummary = summaryMap.get(month)!;
      if (transaction.isExpense) {
        currentSummary.expense += transaction.amount;
      } else {
        currentSummary.income += transaction.amount;
      }

      summaryMap.set(month, currentSummary);
    });

    this.summaryData = Array.from(summaryMap, ([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense
    }));
  }

  prepareChartData() {
    this.chartData = {
      labels: this.summaryData.map((item) => item.month),
      datasets: [
        {
          label: 'Income',
          backgroundColor: '#28a745',
          data: this.summaryData.map((item) => item.income),
        },
        {
          label: 'Expense',
          backgroundColor: '#dc3545',
          data: this.summaryData.map((item) => item.expense),
        }
      ]
    };
  }

  toggleView() {
    this.showChart = !this.showChart;
    this.toggleButtonLabel = this.showChart ? 'View Table' : 'View Chart';
  }
}
