import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from '../side-menu.component';

@Component({
  selector: 'ui-side-menu-sub-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-menu-sub-entry.component.html',
  styleUrl: './side-menu-sub-entry.component.scss'
})
export class SideMenuSubEntryComponent extends UIBaseComponent {

  /** Optional reference to the parent SideMenuComponent (if used inside one) */
  private parentMenu = inject(SideMenuComponent, { optional: true });

  /** Label text for the menu item */
  label = input.required<string>();

  /** Value associated with this menu item */
  value = input.required<string | number | boolean>();

  /** If set to `true` this menu item is disabled and can't be clicked (optional) */
  isDisabled = input<boolean>(false);

  /** Manual override for standalone usage (without parent ui-side-menu) */
  isSelectedInput = input<boolean>(false, { alias: 'isSelected' });

  onSelectionChange = output<string | number | boolean>();

  /** 
   * Computed selected state: if inside a parent ui-side-menu, derives from 
   * the parent's selectedValue; otherwise falls back to the isSelected input.
   */
  isSelected = computed(() => {
    if (this.parentMenu) {
      return this.parentMenu.selectedValue() === this.value();
    }
    return this.isSelectedInput();
  });

  /**
   * Handle click on an option
   * @param $event MouseEvent
   */
  public handleOptionClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    
    if (this.isDisabled()) {
      return;
    }

    // Coordinate via parent if available
    if (this.parentMenu) {
      this.parentMenu.selectItem(this.value());
    }

    this.onSelectionChange.emit(this.value());
  }
}