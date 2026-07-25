import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from '../../pages/reactive-enrollment-form/reactive-enrollment-form';
import { canDeactivateGuard } from '../../guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: EnrollmentForm },
  { path: 'reactive', component: ReactiveEnrollmentForm, canDeactivate: [canDeactivateGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentModule {}
