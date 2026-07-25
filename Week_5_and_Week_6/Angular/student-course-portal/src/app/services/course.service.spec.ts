import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via GET and return them', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should filter out courses with 0 credits', () => {
    const coursesWithZero: Course[] = [
      ...mockCourses,
      { id: 3, name: 'Orientation', code: 'CS100', credits: 0, gradeStatus: 'pending' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(coursesWithZero);
  });

  it('should handle a GET error and surface a friendly message', () => {
    let receivedError: any = null;
    let succeeded = false;

    service.getCourses().subscribe({
      next: () => { succeeded = true; },
      error: (err) => { receivedError = err; }
    });

    // retry(2) issues up to 3 total requests (1 original + 2 retries);
    // each retry only fires after the previous one errors, so flush one at a time
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('error', { status: 500, statusText: 'Server Error' });
    }

    expect(succeeded).toBe(false);
    expect(receivedError).toBeTruthy();
    expect(receivedError.message).toBe('Failed to load courses. Please try again.');
  });

  it('should post a new course via createCourse', () => {
    const newCourse = { name: 'Web Development', code: 'CS105', credits: 4, gradeStatus: 'pending' as const };
    const createdCourse: Course = { id: 5, ...newCourse };

    service.createCourse(newCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(createdCourse);
  });

  it('should delete a course via deleteCourse', () => {
    service.deleteCourse(1).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
