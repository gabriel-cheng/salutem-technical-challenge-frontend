import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerEditComponent } from './hamburger-edit.component';

describe('HamburgerEditComponent', () => {
  let component: HamburgerEditComponent;
  let fixture: ComponentFixture<HamburgerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
