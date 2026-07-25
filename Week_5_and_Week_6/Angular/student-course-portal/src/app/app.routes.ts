import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { authGuard } from './guards/auth.guard';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { NotFoundComponent } from './pages/not-found/not-found';


export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetailComponent }
    ]
  },
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [authGuard]
  },
  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }
];