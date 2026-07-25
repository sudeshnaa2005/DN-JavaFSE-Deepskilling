import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  notifications: string[] = [];

  notify(message: string): void {
    this.notifications.push(message);
  }
}
