import { Routes } from '@angular/router';
import { EnrollmentForm } from '../enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from '../reactive-enrollment-form/reactive-enrollment-form';
import { canDeactivateGuard } from '../../guards/unsaved-changes.guard';

export const enrollmentRoutes: Routes = [
  { path: '', component: EnrollmentForm },
  {
    path: 'reactive',
    component: ReactiveEnrollmentForm,
    canDeactivate: [canDeactivateGuard]
  }
];
