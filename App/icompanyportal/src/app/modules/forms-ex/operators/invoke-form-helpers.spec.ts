import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { invokeForm } from './invoke-form';
import { invalidateForm } from './invoke-form-helpers';

describe('invalidateForm', () => {
  let builder: FormBuilder;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule]
    });
    builder = testBed.inject(FormBuilder);
  });

  it('non bad request result', () => {
    const form = builder.group({
      name: []
    });
    invalidateForm(form, {
      name: ['The name is required']
    });
    expect(form.valid).toBeFalse();
    const control = form.get('name');
    // tslint:disable-next-line: no-string-literal
    expect(form.get('name').errors['server']).toBe('The name is required');
  });
});
