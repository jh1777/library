import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ContentChildren, inject, input, model, output, QueryList } from '@angular/core';
import { UIBaseComponent, UiCollapseButtonComponent } from '../../../shared';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { SideMenuComponent } from '../side-menu.component';
import { SideMenuSubEntryComponent } from '../sub-entry/side-menu-sub-entry.component';

@Component({
  selector: 'ui-side-menu-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule, UiCollapseButtonComponent],
  templateUrl: './side-menu-entry.component.html',
  styleUrl: './side-menu-entry.component.scss'
})
export class SideMenuEntryComponent extends UIBaseComponent {

  /** Optional reference to the parent SideMenuComponent (if used inside one) */
  private parentMenu = inject(SideMenuComponent, { optional: true });

  @ContentChildren(SideMenuSubEntryComponent) subEntries!: QueryList<SideMenuSubEntryComponent>;

  /** Label text for the menu item */
  label = input.required<string>();

  /** Value associated with this menu item */
  value = input.required<string | number | boolean>();

  /** Optional icon for the menu item (Font Awesome icon) */
  icon = input<IconDefinition>();

  /** If set to `true` this menu item is disabled and can't be clicked (optional) */
  isDisabled = input<boolean>(false);

  /** Manual override for standalone usage (without parent ui-side-menu) */
  isSelectedInput = input<boolean>(false, { alias: 'isSelected' });

  onSelectionChange = output<string | number | boolean>();

  isCollapsed = model<boolean>(false);

  hasSubEntries = computed(() => this.subEntries && this.subEntries.length > 0);


  handleExpandToggle($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isCollapsed.set(!this.isCollapsed());
  }

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