import { Component, OnInit } from '@angular/core';
import { CompaniesClient } from 'companies-api';
import { CompanyStore } from 'company-utils';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as saveAs from 'file-saver';

@Component({
  templateUrl: './export-page.component.html'
})
export class ExportPageComponent implements OnInit {
  isExporting: boolean;
  errorMessage: string;

  constructor(public store: CompanyStore, private companiesClient: CompaniesClient) {}

  ngOnInit(): void {}

  export() {
    this.isExporting = true;
    this.errorMessage = undefined;
    this.companiesClient
      .export(this.store.company.value.companyId)
      .pipe(
        finalize(() => (this.isExporting = false)),
        catchError((error) => {
          this.errorMessage = 'An unexpected server error has occurred.';
          return throwError(error);
        })
      )
      .subscribe((blob) => {
        saveAs(blob, 'company.json');
      });
  }
}
