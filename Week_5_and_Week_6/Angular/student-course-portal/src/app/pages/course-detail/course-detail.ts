import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  searchTerm: string = '';
  students: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.cdr.detectChanges();
      },
      error: () => {
        this.course = undefined;
        this.cdr.detectChanges();
      }
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.searchTerm = queryParams.get('search') || '';
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const courseId = Number(params.get('id'));
        return this.courseService.getStudentsByCourse(courseId);
      })
    ).subscribe(students => {
      this.students = students;
      this.cdr.detectChanges();
    });
  }
}