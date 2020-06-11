import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { LabelComponent } from './components/label/label.component';

@NgModule({
  declarations: [
    CheckBoxComponent,
    FormComponent,
    InputComponent,
    SelectComponent,
    SubmitButtonComponent,
    TextAreaComponent,
    TextBoxComponent,
    ImageInputComponent,
    LabelComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CheckBoxComponent,
    FormComponent,
    InputComponent,
    SelectComponent,
    SubmitButtonComponent,
    TextAreaComponent,
    TextBoxComponent,
    ImageInputComponent,
    LabelComponent
  ]
})
export class FormsExModule {}
