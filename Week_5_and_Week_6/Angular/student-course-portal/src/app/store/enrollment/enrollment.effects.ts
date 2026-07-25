import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentService } from '../../services/enrollment.service';
import { enrollInCourse, enrollInCourseSuccess, enrollInCourseFailure, unenrollFromCourse, unenrollFromCourseSuccess } from './enrollment.actions';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private enrollmentService = inject(EnrollmentService);

  enroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrollInCourse),
      switchMap(({ courseId }) => {
        this.enrollmentService.enroll(courseId);
        return of(enrollInCourseSuccess({ courseId })).pipe(
          catchError(error => of(enrollInCourseFailure({ error: error.message })))
        );
      })
    )
  );

  unenroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unenrollFromCourse),
      switchMap(({ courseId }) => {
        this.enrollmentService.unenroll(courseId);
        return of(unenrollFromCourseSuccess({ courseId }));
      })
    )
  );
}