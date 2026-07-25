import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="not-found">
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  `
})
export class NotFoundComponent {}
