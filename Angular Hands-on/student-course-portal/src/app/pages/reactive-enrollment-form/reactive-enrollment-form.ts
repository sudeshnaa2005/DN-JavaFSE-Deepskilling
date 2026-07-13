import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrls: ['./reactive-enrollment-form.css']
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  get studentNameCtrl() {
    return this.enrollForm.get('studentName') as FormControl;
  }

  get studentEmailCtrl() {
    return this.enrollForm.get('studentEmail') as FormControl;
  }

  get courseIdCtrl() {
    return this.enrollForm.get('courseId') as FormControl;
  }

  get agreeToTermsCtrl() {
    return this.enrollForm.get('agreeToTerms') as FormControl;
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse() {
    this.additionalCourses.push(new FormControl('', [Validators.required, noCourseCode]));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  onSubmit() {
    console.log(this.enrollForm.value);
    console.log(this.enrollForm.getRawValue());
    // enrollForm.value excludes disabled controls; getRawValue() includes all controls.
  }
}

export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  return typeof value === 'string' && value.startsWith('XX') ? { noCourseCode: true } : null;
}

export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = control.value as string;
      resolve(email?.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}
