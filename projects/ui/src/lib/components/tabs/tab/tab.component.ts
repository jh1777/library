import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, model } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { BadgeComponent, BadgeStyle } from '../../badge';

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

  /**
   * Badge value that will be shown next to the tab label (optional).  
   * The `ui-badge` component will be used to display this.  
   */
  badgeValue = input<number>();

  /**
   * Badge style that will be used for the Badge (optional).  
   * Only applicable if `badgeValue` is set.  
   * See {@link BadgeStyle}   
   */
  badgeStyle = input<BadgeStyle>(BadgeStyle.None);
}
