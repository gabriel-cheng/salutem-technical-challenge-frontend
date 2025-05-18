import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerNewComponent } from './hamburger-new.component';

describe('HamburgerNewComponent', () => {
  let component: HamburgerNewComponent;
  let fixture: ComponentFixture<HamburgerNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
