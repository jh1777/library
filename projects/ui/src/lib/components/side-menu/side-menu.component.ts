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

  sections = input.required<SideMenuSection[]>();

  showSectionDivider = input<boolean>(true);
  
  //items = input.required<SideMenuItem[]>();
  
  selectedValue = model<string | number | boolean>();
  
  onSelectionChange = output<string | number | boolean>();


  /**
   * Handle click on an option
   * @param option The clicked option
   * @param $event MouseEvent
   */
  public handleOptionClick(item: SideMenuItem, $event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    
    if (item.isDisabled) {
      return;
    }

    // Only change if it's a different value
    if (this.selectedValue() !== item.value) {
      this.selectedValue.set(item.value);
      this.onSelectionChange.emit(item.value);
    }
  }
}