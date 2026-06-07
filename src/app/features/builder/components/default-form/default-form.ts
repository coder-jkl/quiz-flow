import { Component, forwardRef, OnInit, signal } from '@angular/core';
import { Input } from '../../../../shared/components/input/input';
import {
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { ButtonTieredMenu } from '../../../../shared/components/button-tiered-menu/button-tiered-menu';
import { Button } from 'primeng/button';
import { tap } from 'rxjs';
import { InputErrorPipe } from '../../../../shared/pipes/input-error-pipe';

@Component({
  selector: 'app-default-form',
  imports: [
    Input,
    ReactiveFormsModule,
    Textarea,
    ButtonTieredMenu,
    Button,
    InputErrorPipe,
  ],
  templateUrl: './default-form.html',
  styleUrl: './default-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultForm),
      multi: true,
    },
  ],
})
export class DefaultForm implements OnInit {
  public readonly buttonIconItems = [
    {
      label: 'Change',
      command: () => {
        this.isChange.set(!this.isChange());
      },
    },
    {
      label: 'Delete',
      // command: () => {
      //   this.delete();
      // },
    },
  ];

  public fg = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    question: new FormControl(null, [Validators.required]),
    fields: new FormArray<FormControl>([
      new FormControl(null, [Validators.required]),
    ]),
  });

  public get fields(): FormArray<FormControl> {
    return this.fg.get('fields') as FormArray;
  }

  public isChange = signal(false);

  public onDeleteField(index: number): void {
    this.fields.removeAt(index);
  }

  public onAddField(): void {
    this.fields.push(new FormControl(null, [Validators.required]));
  }

  public ngOnInit(): void {
    this.fg.valueChanges
      .pipe(
        tap((value) => {
          this.onChange(value);
        })
      )
      .subscribe();
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(value: any): void {
    if (value) {
      this.fg.patchValue(value, { emitEvent: false });
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
