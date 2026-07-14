import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [NgIf, NgFor, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  ngOnInit(): void {
    // test stub for lifecycle interface
  }
  // Minimal stubs used by the template to satisfy Angular template type checking in tests
  isLoading = false;
  selectedCourseId: number | null = null;
  selectedCourse: any = null;
  courses: any[] = [];

  trackByCourseId(index: number, course: any) {
    return course?.id ?? index;
  }

  onEnroll(courseId: number) {
    // stub for template event
  }

  isEnrolled(courseId: number): boolean {
    return false;
  }
}