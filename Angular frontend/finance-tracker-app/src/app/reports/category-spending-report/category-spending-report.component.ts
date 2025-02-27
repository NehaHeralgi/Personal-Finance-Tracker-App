import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-category-spending-report',
  standalone: true,
  imports: [NavbarComponent,TableModule,NgxChartsModule,ChartModule,ButtonModule,CardModule],
  templateUrl: './category-spending-report.component.html',
  styleUrl: './category-spending-report.component.css'
})
export class CategorySpendingReportComponent {
  transactions: any[] = [];
  categorySpending: any[] = [];
  showTable: boolean = true;
  chartData: any;

  constructor(private transactionService: CommonService) {}

  ngOnInit(): void {
    this.loadCategorySpending();
  }

  loadCategorySpending() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data.filter(t => t.isExpense); // Only expenses
      this.groupByCategory();
      this.updateChartData();
    });
  }

  groupByCategory() {
    const categoryMap = new Map();
    this.transactions.forEach(t => {
      if (categoryMap.has(t.categoryName)) {
        categoryMap.set(t.categoryName, categoryMap.get(t.categoryName) + t.amount);
      } else {
        categoryMap.set(t.categoryName, t.amount);
      }
    });

    this.categorySpending = Array.from(categoryMap, ([name, value]) => ({ name, value }));
  }

  updateChartData() {
    this.chartData = {
      labels: this.categorySpending.map(c => c.name),
      datasets: [{
        data: this.categorySpending.map(c => c.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };
  }

  toggleView() {
    this.showTable = !this.showTable;
  }
}
