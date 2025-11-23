import { AbstractControl, ValidatorFn } from "@angular/forms";


export function noAccentValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;

    const hasAccent = /[áàãâéêíóôõúç]/i.test(control.value);
    return hasAccent ? { accentNotAllowed: true } : null;
  };
}