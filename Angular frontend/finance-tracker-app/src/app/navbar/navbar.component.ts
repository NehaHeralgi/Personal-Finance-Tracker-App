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
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-navbar',
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
        PanelMenuModule 
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems: any[];
  constructor(
    private dialog: MatDialog
  ) {

    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Transactions', icon: 'pi pi-indian-rupee', routerLink: ['/alltransaction'] },
      {
        label: 'Reports',
        icon: 'pi pi-chart-bar',
        items: [
          { label: 'Income & Expense Summary', icon: 'pi pi-chart-line', routerLink: ['/reports/income-expense-report'] },
          { label: 'Category-wise Spending', icon: 'pi pi-tags', routerLink: ['/reports/category-spending-report'] },
          { label: 'Monthly Spending Trend', icon: 'pi pi-calendar', routerLink: ['/reports/monthly-trend-report'] }
        ]
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

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
