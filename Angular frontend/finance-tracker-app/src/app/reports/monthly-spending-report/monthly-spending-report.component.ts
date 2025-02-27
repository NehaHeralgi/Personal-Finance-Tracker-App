import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monthly-spending-report',
  standalone: true,
  imports: [FormsModule, NavbarComponent,TableModule,NgxChartsModule,ChartModule,ButtonModule,CardModule,DropdownModule,CalendarModule],
  templateUrl: './monthly-spending-report.component.html',
  styleUrl: './monthly-spending-report.component.css'
})
export class MonthlySpendingReportComponent {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  categoryOptions: { label: string; value: string }[] = [];
  isChartView: boolean = false;

  // Filters
  selectedCategory: string = '';
  dateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  minAmount: number | null = null;
  maxAmount: number | null = null;
  type: string = ''; // "income" or "expense"

  chartData: any[] = [];

  constructor(private transactionService: CommonService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.generateCategoryOptions();
      this.applyFilters();
    });
  }

  generateCategoryOptions() {
    const uniqueCategories = Array.from(new Set(this.transactions.map(t => t.categoryName)));
    this.categoryOptions = uniqueCategories.map(category => ({ label: category, value: category }));
  }

  toggleView() {
    this.isChartView = !this.isChartView;
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter((t) => {
      const matchesCategory = this.selectedCategory ? t.categoryName === this.selectedCategory : true;
      const matchesType = this.type ? (this.type === 'income' ? !t.isExpense : t.isExpense) : true;
      const matchesAmount = (this.minAmount === null || t.amount >= this.minAmount) &&
                            (this.maxAmount === null || t.amount <= this.maxAmount);
      const matchesDate = this.dateRange.start && this.dateRange.end 
        ? new Date(t.date) >= this.dateRange.start && new Date(t.date) <= this.dateRange.end
        : true;
      
      return matchesCategory && matchesType && matchesAmount && matchesDate;
    });

    this.updateChartData();
  }

  updateChartData() {
    const groupedData = this.filteredTransactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

    this.chartData = Object.keys(groupedData).map((month) => ({
      name: month,
      value: groupedData[month]
    }));
  }
}
