import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { invokeForm } from './invoke-form';

describe('invokeForm', () => {
  let builder: FormBuilder;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule]
    });
    builder = testBed.inject(FormBuilder);
  });

  it('non bad request result', () => {
    const observable = new Observable((subscribe) => {
      subscribe.error({
        status: 500
      });
    });
    const form = builder.group({
      name: []
    });
    let error: any;
    observable.pipe(invokeForm(form)).subscribe({
      error: (e) => (error = e)
    });
    expect(error).toBeDefined();
    expect(error.status).toBe(500);
  });

  it('no body returns error', () => {
    const observable = new Observable((subscribe) => {
      subscribe.error({
        status: 400
      });
    });
    const form = builder.group({
      name: []
    });
    let error: any;
    observable.pipe(invokeForm(form)).subscribe({
      error: (e) => (error = e)
    });
    expect(error).toBeDefined();
    expect(error.status).toBe(400);
  });
});
