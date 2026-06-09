import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultForm } from '../default-form/default-form';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-parent-form',
  imports: [DefaultForm, Button, ReactiveFormsModule, Divider],
  templateUrl: './parent-form.html',
  styleUrl: './parent-form.scss',
})
export class ParentForm {
  public fg = new FormGroup({
    forms: new FormArray([this.createForm()]),
  });

  private createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [Validators.required]),
      question: new FormControl(null, [Validators.required]),
      fields: new FormArray([new FormControl(null, [Validators.required])]),
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
}
