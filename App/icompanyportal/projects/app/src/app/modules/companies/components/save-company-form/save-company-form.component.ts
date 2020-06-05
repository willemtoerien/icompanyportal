import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Company, CompaniesClient, SaveCompanyRequest } from 'companies-api';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidators, invokeForm, ImageInputData } from 'forms-ex';
import { Observable } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';
import { CompanyStore, CompanyResolver } from 'company-utils';

@Component({
  selector: 'app-save-company-form',
  templateUrl: './save-company-form.component.html'
})
export class SaveCompanyFormComponent implements OnInit {
  imageInputData: ImageInputData;

  form: FormGroup;

  get company() {
    return this.store.company.value;
  }

  set company(value: Company) {
    this.store.company.next(value);
  }

  get src() {
    return `data:${this.company.logoContentType};base64,${this.company.logo}`;
  }

  get hasSrc() {
    return !!this.company.logo;
  }

  get defaultSrc() {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.company.name)}`;
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
    const request: SaveCompanyRequest = this.form.value;
    if (this.imageInputData) {
      request.logo = this.imageInputData.data;
      request.logoContentType = this.imageInputData.contentType;
    }
    const action: Observable<any> = this.company
      ? this.companiesClient.save(this.company.companyId, request)
      : this.companiesClient.create(request);
    action.pipe(invokeForm(this.form)).subscribe((id) => {
      if (this.company) {
        const company = this.company;
        company.name = request.name;
        company.uniqueName = request.uniqueName;
        this.company = company;
      }
      this.store.updated.emit();
      this.router.navigateByUrl(`/companies/${id ? id : this.company.companyId}`);
    });
  }

  private format(value: string) {
    return value
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .replace(' ', '-')
      .toLowerCase();
  }

  onImageChanged(data: ImageInputData) {
    this.imageInputData = data;
  }

  onDeleteLogo() {
    this.companiesClient
      .deleteLogo(this.company.companyId)
      .pipe(flatMap(() => this.companiesClient.getCompany(this.company.companyId)))
      .subscribe((company) => {
        this.store.company.next(company);
        this.store.updated.emit();
      });
  }
}
