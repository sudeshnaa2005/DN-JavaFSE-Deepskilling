import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { CourseCard } from './course-card';
import { Course } from '../../models/course';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested with the course id when the Enroll button is clicked', () => {
    vi.spyOn(component.enrollRequested, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const enrollButton = compiled.querySelectorAll('button')[0] as HTMLButtonElement;
    enrollButton.click();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should call ngOnChanges when course input changes and log the change', () => {
    vi.spyOn(console, 'log');
    const updatedCourse: Course = { ...mockCourse, id: 2, name: 'Operating Systems' };
    component.course = updatedCourse;
    component.ngOnChanges({
      course: {
        previousValue: mockCourse,
        currentValue: updatedCourse,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(console.log).toHaveBeenCalledWith('previous course:', mockCourse);
    expect(console.log).toHaveBeenCalledWith('current course:', updatedCourse);
  });
});