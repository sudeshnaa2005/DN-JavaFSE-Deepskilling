import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-status-widget',
  standalone: true,
  template: `
    <div class="status-widget">
      <p>Enrolled courses count: {{ enrolledCount }}</p>
    </div>
  `,
  styles: [
    `.status-widget { padding: 1rem; margin-top: 1rem; border: 1px solid #888; border-radius: 6px; }`
  ]
})
export class EnrollmentStatusWidget {
  constructor(private enrollmentService: EnrollmentService) {}

  get enrolledCount(): number {
    return this.enrollmentService.getEnrolledCourses().length;
  }
}
