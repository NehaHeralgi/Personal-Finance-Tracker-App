import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,MatDialogModule,ReactiveFormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  addTransactionForm: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: CommonService,
    public dialogRef: MatDialogRef<TransactionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // If data exists, it's for editing
  ) {
    this.addTransactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      isExpense: [true, Validators.required] // Default is Expense (true)
    });
  }

  ngOnInit(): void {
    // Fetch categories for dropdown
    this.transactionService.getCategories().subscribe(
      (data) => {
        this.categories = data; // Load categories
  
        // Ensure category is set AFTER categories are fetched
        if (this.data) {
          this.addTransactionForm.patchValue({
            amount: this.data.amount,
            category: this.data.categoryId, // Ensure this matches category list
            description: this.data.description,
            isExpense: this.data.isExpense
          });
        }
        console.log('Categories:', this.categories);
        console.log('Selected Category ID:', this.data?.categoryId);
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

    if (this.data) {
      // Edit the existing transaction
      this.transactionService.updateTransaction({ ...transaction, id: this.data.id }).subscribe(() => {
        this.dialogRef.close('edit');
      });
    } else {
      // Add new transaction
      this.transactionService.addTransaction(transaction).subscribe(() => {
        this.dialogRef.close('add');
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
