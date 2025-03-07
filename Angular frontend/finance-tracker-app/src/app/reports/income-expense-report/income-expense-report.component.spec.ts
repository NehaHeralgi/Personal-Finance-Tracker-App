import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseReportComponent } from './income-expense-report.component';

describe('IncomeExpenseReportComponent', () => {
  let component: IncomeExpenseReportComponent;
  let fixture: ComponentFixture<IncomeExpenseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeExpenseReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeExpenseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
