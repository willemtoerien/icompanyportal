import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Company, CompaniesClient } from 'companies-api';
import { Router } from '@angular/router';
import { FormValidators, invokeForm } from 'forms-ex';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  selector: 'app-save-company-form',
  templateUrl: './save-company-form.component.html',
  styles: []
})
export class SaveCompanyFormComponent implements OnInit {
  form: FormGroup;

  get company() {
    return this.store.company.value;
  }

  set company(value: Company) {
    this.store.company.next(value);
  }

  constructor(
    private builder: FormBuilder,
    private companiesClient: CompaniesClient,
    private store: CompanyStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      uniqueName: new FormControl(this.company ? this.company.uniqueName : '', {
        updateOn: 'blur',
        validators: [Validators.required],
        asyncValidators: FormValidators.isUnique(
          (x) => this.companiesClient.isUniqueNameUnique(x),
          'The unique name you provided is already in use.',
          this.company ? this.company.uniqueName : undefined
        )
      }),
      name: [this.company ? this.company.name : '', Validators.required]
    });
    const nameControl = this.form.get('name');
    const uniqueControl = this.form.get('uniqueName');
    nameControl.valueChanges.subscribe((value) => {
      if (!this.company && !uniqueControl.dirty) {
        uniqueControl.setValue(this.format(value));
      }
    });
    uniqueControl.valueChanges.subscribe((value) => {
      const formatted = this.format(value);
      if (formatted !== value) {
        uniqueControl.setValue(formatted);
      }
    });
  }

  onSubmit() {
    const action: Observable<any> = this.company
      ? this.companiesClient.save(this.company.companyId, this.form.value)
      : this.companiesClient.create(this.form.value);
    action
      .pipe(
        invokeForm(this.form),
        tap((id) => {
          this.company = {
            companyId: id ? id : this.company.companyId,
            uniqueName: this.form.value.uniqueName,
            name: this.form.value.name
          };
          this.store.updated.emit();
        })
      )
      .subscribe((id) => {
        this.router.navigateByUrl(`/companies/${id ? id : this.company.companyId}`);
      });
  }

  private format(value: string) {
    return value
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .replace(' ', '-')
      .toLowerCase();
  }
}