import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkNewComponent } from './drink-new.component';

describe('DrinkNewComponent', () => {
  let component: DrinkNewComponent;
  let fixture: ComponentFixture<DrinkNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
