import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl).pipe(
      map(courses => courses.filter(c => c.credits > 0)),
      tap(courses => console.log('Courses loaded:', courses.length)),
      // tap is for side effects only (logging) — it must never alter the stream;
      // transformations belong in map, not tap.
      retry(2),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${course.id}`, course);
  }

  deleteCourse(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/enrollments?courseId=${courseId}`);
  }
}