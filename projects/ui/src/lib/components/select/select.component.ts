import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { SelectOption, SelectStyle } from './select.models';

@Component({
  selector: 'ui-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent extends UIBaseComponent {

  /**
   * Label for the select dropdown (optional)
   */
  label = input<string>();

  /**
   * Placeholder text shown when no option is selected (optional)
   */
  placeholderText = input<string>('Select an option');

  /**
   * Array of options to display in the dropdown
   */
  options = input<SelectOption[]>([]);

  /**
   * Currently selected value
   * Input / Output
   * Default: `undefined`
   */
  value = model<string | number | undefined>(undefined);

  /**
   * If set to `true` this Select is disabled and can't be clicked (optional)
   * Default: `false`
   */
  isDisabled = model<boolean>(false);

  /**
   * Style of the Select; changes the border color
   * `None` = 0 (Grey - default)
   * `Attention` = 1 (Orange)
   * `Error` = 2 (Red)
   * `Success` = 3 (Green)
   * See {@link SelectStyle}
   */
  style = input(SelectStyle.None);

  /**
   * Output event emitted when the selection changes
   */
  onChange = output<string | number | undefined>();

  /**
   * Handle change event from the select element
   * @param event Event from the select element
   */
  public handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    
    // Convert to number if the original option value was a number
    const option = this.options().find(opt => String(opt.value) === selectedValue);
    const newValue = option?.value;
    
    this.value.set(newValue);
    this.onChange.emit(newValue);
  }
}
