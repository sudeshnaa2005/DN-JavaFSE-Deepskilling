import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = true; // Hardcoded for now

  checkLogin(): boolean {
    return this.isLoggedIn;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkLogin()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
