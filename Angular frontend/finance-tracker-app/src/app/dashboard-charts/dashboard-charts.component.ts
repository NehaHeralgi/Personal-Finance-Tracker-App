import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxChartsModule,
  ],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class DashboardChartsComponent implements OnChanges {
  @Input() transactions: any[] = [];

  pieChartData: any[] = [];
  barChartData: any[] = [];
  lineChartData: any[] = [];

  view: [number, number] = [800, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showLabels = true;
  explodeSlices = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.updateCharts();
    }
  }

  updateCharts() {
    const expense = this.transactions
      .filter((t) => t.isExpense)
      .reduce((sum, t) => sum + t.amount, 0);
    const income = this.transactions
      .filter((t) => !t.isExpense)
      .reduce((sum, t) => sum + t.amount, 0);

    this.pieChartData = [
      { name: 'Expenses', value: expense },
      { name: 'Income', value: income }
    ];

    this.barChartData = this.calculateMonthlySpendingTrend();
    this.lineChartData = this.calculateBalanceGrowth();
  }

  calculateMonthlySpendingTrend() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const monthData = this.transactions.filter(
        (t) => new Date(t.date).getMonth() === index
      );
      const monthlyExpense = monthData
        .filter((t) => t.isExpense)
        .reduce((sum, t) => sum + t.amount, 0);
      return { name: month, value: monthlyExpense };
    });
  }

  calculateBalanceGrowth() {
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
}
