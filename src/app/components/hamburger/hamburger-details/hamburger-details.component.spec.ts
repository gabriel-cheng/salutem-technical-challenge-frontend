import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerDetailsComponent } from './hamburger-details.component';

describe('HamburgerDetailsComponent', () => {
  let component: HamburgerDetailsComponent;
  let fixture: ComponentFixture<HamburgerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
