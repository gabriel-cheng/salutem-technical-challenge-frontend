import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerFormComponent } from './hamburger-form.component';

describe('HamburgerFormComponent', () => {
  let component: HamburgerFormComponent;
  let fixture: ComponentFixture<HamburgerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
