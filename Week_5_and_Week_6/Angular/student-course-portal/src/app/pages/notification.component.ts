import { Component, OnDestroy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { EnrollmentService } from '../services/enrollment.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf, NgFor],
  providers: [NotificationService],
  template: `
    <div class="notification-panel">
      <h3>Enrolled Courses</h3>
      <ul>
        <li *ngFor="let course of enrolledCourses">{{ course.name }}</li>
      </ul>
      <p *ngIf="enrolledCourses.length === 0">No courses enrolled yet.</p>
      <button (click)="addNotification()">Add Local Notification</button>
      <div *ngIf="notifications.length">
        <h4>Local notifications</h4>
        <ul>
          <li *ngFor="let note of notifications">{{ note }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `.notification-panel { padding: 1rem; border: 1px solid #007acc; background: #f0f8ff; border-radius: 6px; }`
  ]
})
export class NotificationComponent implements OnDestroy {
  notifications: string[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private notificationService: NotificationService
  ) {
    this.notifications = this.notificationService.notifications;
  }

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }

  addNotification(): void {
    this.notificationService.notify('New notification from NotificationComponent');
    this.notifications = this.notificationService.notifications;
  }

  ngOnDestroy(): void {
    console.log('NotificationComponent destroyed');
  }
}
