import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from './course.service';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    const course = this.courseService.getCourseById(courseId);
    if (course && !this.isEnrolled(courseId)) {
      this.enrolledCourses.push(course);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourses = this.enrolledCourses.filter(course => course.id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(course => course.id === courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}
