import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate();
  }
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const guard = inject(UnsavedChangesGuard);
  return guard.canDeactivate(component);
};
