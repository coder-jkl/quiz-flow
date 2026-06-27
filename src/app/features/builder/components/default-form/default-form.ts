import { Component, input, output, signal } from '@angular/core';
import { Input } from '../../../../shared/components/input/input';
import {
  FormArray,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { InputErrorPipe } from '../../../../shared/pipes/input-error-pipe';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-default-form',
  imports: [
    Input,
    ReactiveFormsModule,
    Textarea,
    Button,
    InputErrorPipe,
    RadioButton,
    FormsModule,
  ],
  templateUrl: './default-form.html',
  styleUrl: './default-form.scss',
})
export class DefaultForm {
  public fg = input.required<FormGroup>();
  public deleteFormEmit = output();

  public isChange = signal(false);

  public get fields(): FormArray<FormGroup> {
    return this.fg().get('fields') as FormArray<FormGroup>;
  }

  public onDeleteField(index: number): void {
    this.fields.removeAt(index);
  }

  public onAddField(): void {
    this.fields.push(
      new FormGroup({
        value: new FormControl(null, [Validators.required]),
        isAnswer: new FormControl(false),
      })
    );
  }

  public onDeleteForm(): void {
    this.deleteFormEmit.emit();
  }

  public onSelectCorrectAnswer(selectedIndex: number): void {
    this.fields.controls.forEach((field, index) => {
      field.get('isAnswer')?.setValue(index === selectedIndex);
    });
  }
}
