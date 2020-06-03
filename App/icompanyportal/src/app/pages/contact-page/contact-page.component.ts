import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailingClient, EmailRequest } from 'emailing-api';

@Component({
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder, private emailingClient: EmailingClient) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit() {
    const request: EmailRequest = {
      to: '.',
      templateKey: 'contact',
      subject: this.form.value.subject,
      data: {
        email: this.form.value.email,
        name: this.form.value.name,
        body: this.form.value.body
      }
    };
    this.emailingClient.send(request).subscribe();
  }
}
