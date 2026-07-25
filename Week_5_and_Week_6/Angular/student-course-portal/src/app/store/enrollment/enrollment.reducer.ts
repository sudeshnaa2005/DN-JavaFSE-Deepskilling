import { createReducer, on } from '@ngrx/store';
import { enrollInCourseSuccess, unenrollFromCourseSuccess, setEnrolledCourses } from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialState: EnrollmentState = { enrolledCourseIds: [] };

export const enrollmentReducer = createReducer(
  initialState,
  on(enrollInCourseSuccess, (state, { courseId }) => ({
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
      ? state.enrolledCourseIds
      : [...state.enrolledCourseIds, courseId]
  })),
  on(unenrollFromCourseSuccess, (state, { courseId }) => ({
    enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
  })),
  on(setEnrolledCourses, (state, { courseIds }) => ({ enrolledCourseIds: courseIds }))
);