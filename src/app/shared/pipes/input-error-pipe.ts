import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'inputError',
})
export class InputErrorPipe implements PipeTransform {
  transform(
    errors: ValidationErrors | null | undefined,
    isTouched: boolean | null | undefined
  ) {
    if (!isTouched || !errors) {
      return null;
    }

    const firstErrorKey = Object.keys(errors)[0];

    switch (firstErrorKey) {
      case 'required':
        return 'This field is required';
      case 'emailValid':
        return 'Please enter a valid email address';
      case 'passwordValid':
        return 'Please enter at least one digit';

      default:
        return 'Contact technical support';
    }
  }
}
