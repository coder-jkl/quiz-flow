import {
  Component,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-input',
  imports: [FormsModule, InputText, Message],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor, OnInit {
  public readonly placeholder = input('');
  public readonly inputSize = input<'small' | 'large'>('small');
  public readonly inputType = input('text');
  public readonly inputVariant = input<'outlined' | 'filled'>('outlined');

  public value = signal('');
  public readonly ngControl = inject(NgControl, {
    optional: true,
    skipSelf: true,
  });

  public ngOnInit(): void {
    if (this.ngControl && !this.ngControl.valueAccessor) {
      this.ngControl.valueAccessor = this;
    }
  }

  public errorText = input<string | null>(null);

  public onValueChange(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(value: string): void {
    this.value.set(value);
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
