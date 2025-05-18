import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkFormComponent } from './drink-form.component';

describe('DrinkFormComponent', () => {
  let component: DrinkFormComponent;
  let fixture: ComponentFixture<DrinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
