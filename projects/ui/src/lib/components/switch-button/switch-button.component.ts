import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-switch-button',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss'
})
export class SwitchButtonComponent extends UIBaseComponent {

  /**
   * Currently selected value
   * Two-way binding supported via [(selectedValue)]
   */
  selectedValue = model<string | number | boolean>();

  /**
   * If set to `true` this SwitchButton is disabled and can't be clicked (optional)
   * Default: `false`
   */
  isDisabled = model<boolean>(false);

  /**
   * Called by child SwitchButtonOptionComponent to update the selected value
   */
  public selectOption(value: string | number | boolean) {
    if (this.isDisabled()) return;
    if (this.selectedValue() !== value) {
      this.selectedValue.set(value);
    }
  }
}
