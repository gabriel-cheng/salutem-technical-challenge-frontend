// import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Hamburger } from '../../../../model/hamburger';

// @Component({
//   selector: 'app-hamburger-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './hamburger-form.component.html'
// })
// export class HamburgerFormComponent implements OnInit, OnChanges {
//   @Input() hamburger: Hamburger | null = null;
//   @Output() formSubmit = new EventEmitter<Hamburger>();

//   hamburgerForm!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.buildForm();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['hamburger'] && changes['hamburger'].currentValue) {
//       if (this.hamburgerForm) {
//         this.hamburgerForm.patchValue(changes['hamburger'].currentValue);
//       }
//     }
//   }

//   private buildForm(): void {
//     this.hamburgerForm = this.fb.group({
//       code: [this.hamburger?.code || '', Validators.required],
//       description: [this.hamburger?.description || '', Validators.required],
//       unity_price: [this.hamburger?.unity_price || 0, Validators.required],
//       sugar_flag: [this.hamburger?.sugar_flag || '', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.hamburgerForm.valid) {
//       const formValue = this.hamburgerForm.value;

//       const result: Hamburger = this.hamburger
//         ? { ...this.hamburger, ...formValue }
//         : formValue;

//       this.formSubmit.emit(result);
//     }
//   }
// }
