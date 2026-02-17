import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent extends UIBaseComponent {

  showSectionDivider = input<boolean>(true);
  
  showBorder = input<boolean>(false);
  
  selectedValue = model<string | number | boolean>();

  /**
   * Called by child SideMenuEntryComponent to update the selection.
   */
  selectItem(value: string | number | boolean) {
    this.selectedValue.set(value);
  }

}