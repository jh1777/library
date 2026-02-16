import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwitchButtonComponent } from '../switch-button.component';

@Component({
  selector: 'ui-switch-button-option',
  standalone: true,
  imports: [FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch-button-option.component.html',
  styleUrl: './switch-button-option.component.scss'
})
export class SwitchButtonOptionComponent {

  label = input.required<string>();
  value = input.required<string | number | boolean>();
  icon = input<IconDefinition>();
  isDisabled = input<boolean>(false);

  onSelectionChange = output<string | number | boolean>();

  private parentSwitchButton = inject(SwitchButtonComponent, { optional: true });

  isSelected = computed(() => {
    if (this.parentSwitchButton) {
      return this.parentSwitchButton.selectedValue() === this.value();
    }
    return false;
  });

  handleClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    const disabled = this.isDisabled() || this.parentSwitchButton?.isDisabled();
    if (disabled) return;

    if (!this.isSelected()) {
      if (this.parentSwitchButton) {
        this.parentSwitchButton.selectOption(this.value());
      }
      this.onSelectionChange.emit(this.value());
    }
  }
}
