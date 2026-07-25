import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="summary-widget">
      <h3>Course Summary</h3>
      <p><strong>Total courses:</strong> {{ totalCourses }}</p>
      <ng-container *ngIf="course; else noCourse">
        <p><strong>Name:</strong> {{ course.name }}</p>
        <p><strong>Code:</strong> {{ course.code }}</p>
        <p><strong>Credits:</strong> {{ course.credits }}</p>
        <p><strong>Status:</strong> {{ course.gradeStatus }}</p>
      </ng-container>
      <ng-template #noCourse>
        <p>No course selected.</p>
      </ng-template>
    </div>
  `,
  styles: [
    `.summary-widget { padding: 1rem; border: 1px solid #ccc; border-radius: 6px; }`
  ]
})
export class CourseSummaryWidget {
  @Input() course: Course | null = null;
  totalCourses = 0;

  constructor(private courseService: CourseService) {
    this.courseService.getCourses().subscribe({ next: (list) => this.totalCourses = list.length, error: () => this.totalCourses = 0 });
  }
}
