import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkEditComponent } from './drink-edit.component';

describe('DrinkEditComponent', () => {
  let component: DrinkEditComponent;
  let fixture: ComponentFixture<DrinkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
