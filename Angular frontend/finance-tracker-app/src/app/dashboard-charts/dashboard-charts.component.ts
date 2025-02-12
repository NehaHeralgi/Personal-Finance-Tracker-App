import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Corrected import
import { MatIconModule } from '@angular/material/icon'; // Corrected import
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule, // Corrected import
    MatIconModule, // Corrected import
    MatTableModule,
    NgxChartsModule,
  ],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class DashboardChartsComponent implements OnChanges {
  @Input() transactions: any[] = [];

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
    if (changes['transactions']) {
      this.updateCharts();
    }
  }

  updateCharts() {
    // Pie chart (Expense vs Income)
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
    const data = this.transactions.map((t) => ({
      name: t.date,
      value: this.transactions
        .filter((transaction) => new Date(transaction.date) <= new Date(t.date))
        .reduce(
          (sum, t) => (t.isExpense ? sum - t.amount : sum + t.amount),
          0
        ),
    }));
    return data;
  }
}
