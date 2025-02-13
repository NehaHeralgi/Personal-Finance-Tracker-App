import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [ CommonModule,MatTableModule,MatButtonModule,MatIcon,MatCard,MatDialogModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.css'
})
export class ProfileModalComponent {
  userEmail = localStorage.getItem('emailid');  // Get logged-in user's email

  constructor(
    private dialogRef: MatDialogRef<ProfileModalComponent>,
    private authService: AuthService,
    private router: Router
  ) {}

  changeTheme() {
    document.body.classList.toggle('dark-theme'); // Toggle dark theme class
  }

  logout() {
    this.authService.logout();
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }


}
