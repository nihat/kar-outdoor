import {FormControl, ValidationErrors} from '@angular/forms';

export class CustomValidator {


  static notOnlyWhiteSpace(control: FormControl): ValidationErrors |  null {
    const isOnlyWhiteSpace: boolean = (control.value != null&& control.value.length> 0 && control.value.trim().length == 0);
    return isOnlyWhiteSpace ? {'notOnlyWhiteSpace': true} : null;
  }
}
