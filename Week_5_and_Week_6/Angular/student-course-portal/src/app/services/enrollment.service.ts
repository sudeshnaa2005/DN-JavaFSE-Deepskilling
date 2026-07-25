import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from './course.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourses: Course[] = [];
  private baseUrl = 'http://localhost:3000/enrollments';

  constructor(private courseService: CourseService, private http: HttpClient) {
    // try to load persisted enrollments if the backend is available
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (list) => {
        const ids = list.map(e => e.courseId);
        ids.forEach(id => {
          this.courseService.getCourseById(id).subscribe({
            next: (course) => this.enrolledCourses.push(course),
            error: () => {}
          });
        });
      },
      error: () => {}
    });
  }

  enroll(courseId: number): void {
    const exists = this.enrolledCourses.some(c => c.id === courseId);
    if (!exists) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (course) => {
          this.enrolledCourses.push(course);
          this.http.post(this.baseUrl, { courseId }).subscribe({ error: () => {} });
        }
      });
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourses = this.enrolledCourses.filter(course => course.id !== courseId);
    // try to remove any server-side enrollment entries for this course
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (list) => {
        const entry = list.find(e => e.courseId === courseId);
        if (entry) {
          this.http.delete(`${this.baseUrl}/${entry.id}`).subscribe({ error: () => {} });
        }
      },
      error: () => {}
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(course => course.id === courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }

  // Return enrollment records for a specific course from the backend
  getEnrollmentsByCourse(courseId: number) {
    return this.http.get<any[]>(`${this.baseUrl}?courseId=${courseId}`);
  }

  // If you store student details separately, you could map enrollments to student records here.
  // For this exercise, we return the enrollment entries (which include courseId and student info).
}
