import { Component, input, output, signal } from '@angular/core';
import { Input } from '../../../../shared/components/input/input';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { InputErrorPipe } from '../../../../shared/pipes/input-error-pipe';

@Component({
  selector: 'app-default-form',
  imports: [
    Input,
    ReactiveFormsModule,
    Textarea,
    Button,
    InputErrorPipe,
  ],
  templateUrl: './default-form.html',
  styleUrl: './default-form.scss',
})
export class DefaultForm {

  public fg = input.required<FormGroup>();

  public deleteFormEmit = output();

  public get fields(): FormArray<FormControl> {
    return this.fg().get('fields') as FormArray;
  }

  public isChange = signal(false);

  public onDeleteField(index: number): void {
    this.fields.removeAt(index);
  }

  public onAddField(): void {
    this.fields.push(new FormControl(null, [Validators.required]));
  }

  public onDeleteForm(): void {
    this.deleteFormEmit.emit();
  }
}
