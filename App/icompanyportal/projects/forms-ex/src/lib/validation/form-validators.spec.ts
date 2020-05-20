import { Observable } from 'rxjs';
import { FormValidators } from './form-validators';
import { FormControl, ValidationErrors } from '@angular/forms';

describe('FormValidators', () => {
  it('isUnique = true', () => {
    const observable = new Observable<boolean>((subscriber) => {
      subscriber.next(false);
      subscriber.complete();
    });

    const validate = FormValidators.isUnique(() => observable, 'Error');
    const control = new FormControl('test');
    const result: Observable<ValidationErrors> = validate(control) as Observable<ValidationErrors>;
    result.subscribe((errors) => {
      expect(errors.isUnique).toBe('Error');
    });
  });
});
