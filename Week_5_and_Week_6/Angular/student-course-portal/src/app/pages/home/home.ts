import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}
  courseCount = 0;

  get enrolledCount(): number {
    return this.enrollmentService.getEnrolledCourses().length;
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({ next: (list) => this.courseCount = list.length, error: () => this.courseCount = 0 });
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}