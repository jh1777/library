import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-tab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent extends UIBaseComponent {

  // TODO: Add a disabled input !!!
  /**
   * Label for this Tab
   */
  label = input<string>();

  /**
   * Input/Output model which indicates if this is the active tab in
   * a ui-tabs component scope
   */
  active = model<boolean>();

  disabled = input<boolean>(false);
}
