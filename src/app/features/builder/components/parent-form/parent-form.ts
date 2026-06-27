import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultForm } from '../default-form/default-form';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { formsArrayValidator } from '../../../../shared/validators/form-builder.validator';
import { markFormGroupTouched } from '../../../../core/helpers/touched-controls-recursion.helper';

@Component({
  selector: 'app-parent-form',
  imports: [DefaultForm, Button, ReactiveFormsModule, Divider],
  templateUrl: './parent-form.html',
  styleUrl: './parent-form.scss',
})
export class ParentForm {
  // private readonly store = inject(FormStore);
  private readonly message = inject(MessageService);

  public fg = new FormGroup({
    forms: new FormArray([this.createForm()], [formsArrayValidator()]),
  });

  private createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(crypto.randomUUID()),
      title: new FormControl(null, [Validators.required]),
      question: new FormControl(null, [Validators.required]),
      fields: new FormArray([this.createFieldGroup()]),
    });
  }

  private createFieldGroup(): FormGroup {
    return new FormGroup({
      value: new FormControl(null, [Validators.required]),
      isAnswer: new FormControl(false),
    });
  }

  public get forms(): FormArray<FormGroup> {
    return this.fg.get('forms') as FormArray<FormGroup>;
  }

  public onAddForm(): void {
    this.forms.push(this.createForm());
  }

  public onDeleteForm(form: FormGroup): void {
    const index = this.forms.controls.indexOf(form);

    if (index !== -1) {
      this.forms.removeAt(index);
    }
  }

  public saveAllForms() {
    if (this.fg.invalid) {
      this.message.add({
        severity: 'error',
        summary: 'Forms is not valid',
      });

      console.log(this.fg.errors);
      markFormGroupTouched(this.fg);

      return;
    }

    if (this.fg.value?.forms?.length === 0) {
      this.message.add({
        severity: 'error',
        summary: 'You need to add one form for save builder',
      });

      return;
    }

    // this.store.saveAllForms(this.fg.value.forms as any);
  }
}
