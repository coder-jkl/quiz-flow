import {
  Component,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule, NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { Message } from 'primeng/message';


@Component({
  selector: 'app-textarea',
  imports: [FormsModule, ReactiveFormsModule, Textarea, Message],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedTextarea),
      multi: true,
    },
  ],
})
export class SharedTextarea implements OnInit, ControlValueAccessor {
  public readonly placeholder = input('');
  public readonly textareaSize = input<'small' | 'large' | 'normal'>('normal');
  public readonly textareaVariant = input<'outlined' | 'filled'>('outlined');

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
