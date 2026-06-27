import { FormArray, FormGroup } from '@angular/forms';

export function markFormGroupTouched(formGroup: FormGroup | FormArray): void {
  Object.values(formGroup.controls).forEach((control) => {
    control.markAsTouched();

    if (control instanceof FormGroup || control instanceof FormArray) {
      markFormGroupTouched(control);
    }
  });
}
