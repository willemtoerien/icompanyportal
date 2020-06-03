import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './contact-page.component.html',
  styles: []
})
export class ContactPageComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit() {}
}
