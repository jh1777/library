import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { ButtonComponent } from '../button';
import { UIBaseComponent } from '../../shared';
import { ValueState } from './value-tile.models';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ui-value-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './value-tile.component.html',
  styleUrl: './value-tile.component.scss'
})
export class ValueTileComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren(this.buttons, 2);
    super.limitContentChildren(this.badges, 1);

    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons.get(i);
      if (button) {
        // Set style of the button accordingly and remove label
        button.iconOnlySimpleStyle.set(true);
        console.log("iconOnlySimpleStyle");
        // Set white mode for any child button if state > 0
        if (this.state() > 0) {
          button.whiteMode.set(true);
        }
      }
    }    
  }

  /** Then key (or label) of the data - shown left */
  key = input.required<string>();

  /** The content / value - shown right */
  value = input.required<string>();

  /**  
   * State `ValueState` of the Item  
   * Optional; By default or no set = `None`  
   * The item will get colorized in:  
   * - `None` = grey (default),  
   * - `Attention` = orange  
   * - `Error` = red  
   * - `Success` = green  
   * Ref. {@link ValueState}
   */
  state = input<ValueState>(ValueState.None);
}
