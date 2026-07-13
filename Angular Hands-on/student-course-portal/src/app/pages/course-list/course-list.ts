import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseSummaryWidget } from '../course-summary-widget/course-summary-widget';
import { EnrollmentStatusWidget } from '../enrollment-status-widget/enrollment-status-widget';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgIf, NgFor, CourseCard, CourseSummaryWidget, EnrollmentStatusWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;
  selectedCourse: Course | null = null;
  courses: Course[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  addSampleCourse(): void {
    const nextId = this.courses.length ? Math.max(...this.courses.map(c => c.id)) + 1 : 1;
    const newCourse: Course = {
      id: nextId,
      name: `New Course ${nextId}`,
      code: `CS10${nextId}`,
      credits: 3,
      gradeStatus: 'pending'
    };

    this.courseService.addCourse(newCourse);
    this.courses = this.courseService.getCourses();
  }

  onEnroll(courseId: number) {
    if (this.enrollmentService.isEnrolled(courseId)) {
      this.enrollmentService.unenroll(courseId);
    } else {
      this.enrollmentService.enroll(courseId);
    }

    this.selectedCourseId = courseId;
    this.selectedCourse = this.courseService.getCourseById(courseId) ?? null;
  }

  isEnrolled(courseId: number): boolean {
    return this.enrollmentService.isEnrolled(courseId);
  }
}