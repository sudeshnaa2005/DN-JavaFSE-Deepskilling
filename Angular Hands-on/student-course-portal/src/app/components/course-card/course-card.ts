import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgClass, NgStyle } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgClass, NgStyle, CreditLabelPipe, Highlight],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;
  @Input() isEnrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get borderColor() {
    switch (this.course.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      default: return 'grey';
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('previous course:', changes['course'].previousValue);
      console.log('current course:', changes['course'].currentValue);
    }
  }
}