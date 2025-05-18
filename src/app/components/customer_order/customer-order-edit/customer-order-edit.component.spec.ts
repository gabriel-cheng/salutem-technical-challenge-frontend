import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderEditComponent } from './customer-order-edit.component';

describe('CustomerOrderEditComponent', () => {
  let component: CustomerOrderEditComponent;
  let fixture: ComponentFixture<CustomerOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
