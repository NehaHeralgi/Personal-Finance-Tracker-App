import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySpendingReportComponent } from './category-spending-report.component';

describe('CategorySpendingReportComponent', () => {
  let component: CategorySpendingReportComponent;
  let fixture: ComponentFixture<CategorySpendingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySpendingReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySpendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
