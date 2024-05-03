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

  /**
   * Label for this Tab
   */
  label = input<string>();

  /**
   * Input/Output model which indicates if this is the active tab in
   * a ui-tabs component scope
   */
  active = model<boolean>();

  /**
   * Use this switch to disable a tab. It will be shown in lighter color and is not clickable.  
   * Optional; Default = `false`  
   */
  disabled = input<boolean>(false);
}
