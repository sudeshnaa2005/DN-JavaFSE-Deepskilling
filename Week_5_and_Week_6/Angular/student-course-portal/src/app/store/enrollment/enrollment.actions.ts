import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction('[Enrollment] Enroll', props<{ courseId: number }>());
export const enrollInCourseSuccess = createAction('[Enrollment] Enroll Success', props<{ courseId: number }>());
export const enrollInCourseFailure = createAction('[Enrollment] Enroll Failure', props<{ error: string }>());

export const unenrollFromCourse = createAction('[Enrollment] Unenroll', props<{ courseId: number }>());
export const unenrollFromCourseSuccess = createAction('[Enrollment] Unenroll Success', props<{ courseId: number }>());

export const setEnrolledCourses = createAction('[Enrollment] Set Enrolled', props<{ courseIds: number[] }>());