import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySpendingReportComponent } from './monthly-spending-report.component';

describe('MonthlySpendingReportComponent', () => {
  let component: MonthlySpendingReportComponent;
  let fixture: ComponentFixture<MonthlySpendingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySpendingReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlySpendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
