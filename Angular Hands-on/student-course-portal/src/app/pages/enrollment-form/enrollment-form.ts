import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrls: ['./enrollment-form.css']
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value);
    console.log(form.valid);
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}