import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseSummaryWidget } from '../course-summary-widget/course-summary-widget';
import { EnrollmentStatusWidget } from '../enrollment-status-widget/enrollment-status-widget';
import { Course } from '../../models/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, AsyncPipe, CourseCard, CourseSummaryWidget, EnrollmentStatusWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  enrolledIds$: Observable<number[]>;

  enrolledStudents: any[] = [];
  selectedCourseId: number | null = null;
  selectedCourse: Course | null = null;
  searchTerm: string = '';
  private latestCourses: Course[] = [];
  private latestEnrolledIds: number[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
    this.courses$.subscribe(courses => this.latestCourses = courses);
    this.enrolledIds$.subscribe(ids => this.latestEnrolledIds = ids);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  addSampleCourse(): void {
    const nextId = this.latestCourses.length ? Math.max(...this.latestCourses.map(c => c.id)) + 1 : 1;
    const newCourse: Omit<Course, 'id'> = {
      name: `New Course ${nextId}`,
      code: `CS10${nextId}`,
      credits: 3,
      gradeStatus: 'pending'
    };

    this.courseService.createCourse(newCourse).subscribe({
      next: () => this.store.dispatch(loadCourses()),
      error: () => {}
    });
  }

  onEnroll(courseId: number) {
    if (this.isEnrolled(courseId)) {
      this.store.dispatch(unenrollFromCourse({ courseId }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId }));
    }
    this.selectedCourseId = courseId;

    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
        this.enrollmentService.getEnrollmentsByCourse(courseId).subscribe({
          next: (enrollments) => { this.enrolledStudents = enrollments; },
          error: () => { this.enrolledStudents = []; }
        });
      }
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.latestEnrolledIds.includes(courseId);
  }

  navigateToCourseDetail(courseId: number) {
    this.router.navigate(['/courses', courseId], { queryParams: { search: this.searchTerm } });
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.router.navigate([], { relativeTo: this.route, queryParams: { search: this.searchTerm || null }, replaceUrl: true });
  }
}