import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { NotificationComponent } from '../notification.component';
import { Course } from '../../models/course';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgIf, NgFor, NotificationComponent],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  constructor(private enrollmentService: EnrollmentService) {}

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }
}

