import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function ValidateRegExp(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return regexp.test(control.value) ? null : { nomatch: { value: control.value } }
  }
}

export function ValidateInt(): ValidatorFn {
  return ValidateRegExp(/^\d+$/)
}

export function ValidateWeight(): ValidatorFn {
  return ValidateRegExp(/^\d{1,4}(\.\d)?$/)
}
