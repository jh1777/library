import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, Input, input, model, signal, Signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  styleUrl: './input.component.scss'
})
export class InputComponent extends UIBaseComponent implements ControlValueAccessor {
  // Define signals for inputs

  label = input<string>('');
  valuePlaceholder = input<string>('');
  type = input<string>('text');
  isDisabled = model<boolean>(false);

  // Create a signal for the value
  private _value: WritableSignal<string> = signal('');

  // Expose a computed signal for templates
  value = computed(() => this._value());

  // Placeholder functions, Angular replaces them
  onChange = (value: string) => {};
  onTouched = () => {};

 /** Called when the input value changes */
 setValue(event: Event) {
  const val = (event.target as HTMLInputElement).value;
    if (val !== this._value()) {
      this._value.set(val);
      this.onChange(val); // Notify Angular Forms
    }
  }

  /** Implements ControlValueAccessor methods */
  writeValue(value: string): void {
    this._value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
