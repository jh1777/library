import { ChangeDetectionStrategy, Component, computed, inject, input, model, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { SideMenuItem } from '../side-menu.models';
import { SideMenuComponent } from '../side-menu.component';

@Component({
  selector: 'ui-side-menu-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-menu-entry.component.html',
  styleUrl: './side-menu-entry.component.scss'
})
export class SideMenuEntryComponent extends UIBaseComponent {

  /** Optional reference to the parent SideMenuComponent (if used inside one) */
  private parentMenu = inject(SideMenuComponent, { optional: true });

  item = input.required<SideMenuItem>();

  /** Manual override for standalone usage (without parent ui-side-menu) */
  isSelectedInput = input<boolean>(false, { alias: 'isSelected' });

  onSelectionChange = output<SideMenuItem>();

  /** 
   * Computed selected state: if inside a parent ui-side-menu, derives from 
   * the parent's selectedValue; otherwise falls back to the isSelected input.
   */
  isSelected = computed(() => {
    if (this.parentMenu) {
      return this.parentMenu.selectedValue() === this.item().value;
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
    
    if (this.item().isDisabled) {
      return;
    }

    // Coordinate via parent if available
    if (this.parentMenu) {
      this.parentMenu.selectItem(this.item());
    }

    this.onSelectionChange.emit(this.item());
  }
}