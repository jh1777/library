import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';

import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { SideMenuItem, SideMenuSection } from './side-menu.models';



@Component({
  selector: 'ui-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent extends UIBaseComponent {

  //sections = input.required<SideMenuSection[]>();

  showSectionDivider = input<boolean>(true);
  
  //items = input.required<SideMenuItem[]>();
  
  selectedValue = model<string | number | boolean>();
  
  onSelectionChange = output<SideMenuItem>();

  /**
   * Called by child SideMenuEntryComponent to update the selection.
   * Updates the selected value and emits the selection change event.
   */
  selectItem(item: SideMenuItem) {
    this.selectedValue.set(item.value);
    this.onSelectionChange.emit(item);
  }

}