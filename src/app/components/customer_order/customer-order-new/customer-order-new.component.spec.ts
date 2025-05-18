import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderNewComponent } from './customer-order-new.component';

describe('CustomerOrderNewComponent', () => {
  let component: CustomerOrderNewComponent;
  let fixture: ComponentFixture<CustomerOrderNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
