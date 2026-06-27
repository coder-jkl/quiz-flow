import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function formsArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formsArray = control as FormArray;

    if (!formsArray || formsArray.length === 0) {
      return { emptyForms: 'At least one form is required' };
    }

    for (let i = 0; i < formsArray.length; i++) {
      const form = formsArray.at(i) as FormGroup;
      if (form.invalid) {
        return { invalidForm: `Form ${i + 1} is invalid` };
      }

      const fieldsArray = form.get('fields') as FormArray;
      const hasCorrectAnswer = fieldsArray?.controls.some(
        (field) => (field as FormGroup).get('isAnswer')?.value === true
      );

      if (!hasCorrectAnswer) {
        return {
          noCorrectAnswer: `Form ${i + 1} has no correct answer selected`,
        };
      }
    }

    return null;
  };
}
