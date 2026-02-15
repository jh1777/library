import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwitchButtonOption } from './switch-button.models';

@Component({
  selector: 'ui-switch-button',
  standalone: true,
  imports: [FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss'
})
export class SwitchButtonComponent extends UIBaseComponent {
  
  /**
   * Array of options for the switch button (required, max 10)  
   * Each option should have a label, optional icon, and a value
   */
  options = input.required<SwitchButtonOption[]>();

  /**
   * Currently selected value  
   * Input / Output  
   * Default: First option's value
   */
  selectedValue = model<any>();

  /**
   * If set to `true` this SwitchButton is disabled and can't be clicked (optional)  
   * Default: `false`  
   */
  isDisabled = model<boolean>(false);

  /**
   * Event emitted when the selection changes  
   * (emits the newly selected value)
   */
  onSelectionChange = output<any>();

  /**
   * Computed property to check if first option is selected
   */
  isFirstSelected = computed(() => {
    const opts = this.options();
    const selected = this.selectedValue();
    return opts.length > 0 && selected === opts[0].value;
  });

  /**
   * Computed property to check if second option is selected
   */
  isSecondSelected = computed(() => {
    const opts = this.options();
    const selected = this.selectedValue();
    return opts.length > 1 && selected === opts[1].value;
  });

  /**
   * Handle click on an option
   * @param option The clicked option
   * @param $event MouseEvent
   */
  public handleOptionClick(option: SwitchButtonOption, $event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    
    if (this.isDisabled()) {
      return;
    }

    // Only change if it's a different value
    if (this.selectedValue() !== option.value) {
      this.selectedValue.set(option.value);
      this.onSelectionChange.emit(option.value);
    }
  }
}
