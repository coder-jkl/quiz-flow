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
import { quizFlowStore } from '../../../../core/store/form.store';

@Component({
  selector: 'app-parent-form',
  imports: [DefaultForm, Button, ReactiveFormsModule, Divider],
  templateUrl: './parent-form.html',
  styleUrl: './parent-form.scss',
})
export class ParentForm {
  private readonly store = inject(quizFlowStore);
  private readonly message = inject(MessageService);

  public fg = new FormGroup({
    forms: new FormArray([this.createForm()]),
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

      this.fg.markAllAsTouched();

      return;
    }

    this.store.saveAllForms(this.fg.value.forms as any);

    this.message.add({
      severity: 'success',
      summary: 'Forms saved successfully',
      detail: 'Soon redirecting to the main page',
    });
  }
}
