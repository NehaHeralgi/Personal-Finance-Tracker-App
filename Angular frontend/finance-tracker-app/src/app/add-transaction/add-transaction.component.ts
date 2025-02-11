import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
  addTransactionForm!: FormGroup;
  categories: any[] = []; // Categories for dropdown

  constructor(
    private fb: FormBuilder,
    private transactionService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTransactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      isExpense: [true, Validators.required] // Default is Expense (true)
    });

    // Fetch categories for dropdown
    this.transactionService.getCategories().subscribe(
      (data) => {
        this.categories = data; // Assuming categories are returned in an array
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addTransactionForm.invalid) return;

    const { amount, category, description, isExpense } = this.addTransactionForm.value;

    const transaction = {
      amount,
      categoryId: category, // Assuming category is passed as an ID
      description,
      isExpense,
      date: new Date() // Set the current date
    };

    this.transactionService.addTransaction(transaction).subscribe(
      (response) => {
        // After saving the transaction, redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Error adding transaction!');
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
