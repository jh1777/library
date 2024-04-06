import { AfterContentInit, Component, ContentChildren, QueryList, input } from '@angular/core';
import { ButtonV2Component } from '../button-v2/button-v2.component';
import { UIBaseComponent } from '../../base/ui-base.component';
import { ValueState } from './value-tile.models';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ui-value-tile',
  standalone: true,
  imports: [],
  templateUrl: './value-tile.component.html',
  styleUrl: './value-tile.component.scss'
})
export class ValueTileComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ButtonV2Component) buttons: QueryList<ButtonV2Component>;
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;

  ngAfterContentInit(): void {
    if(this.badges.length > 1) {
      for (let i = 1; i < this.badges.length; i++) {
        this.badges.get(i).hidden.set(true);
      }
    }

    for (let i = 0; i < this.buttons.length; i++) {
      if (i > 1) {
        this.buttons.get(i).hidden.set(true);
      }
      if (this.state() > 0) {
        console.log("Set white mode for button ", i)
        this.buttons.get(i).whiteMode.set(true);
      }
    }
    
  }

  key = input.required<string>();
  value = input.required<string>();

  /** Optional: State `ValueState` of the Item (`none`, `attention`, `error` or `success`)
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `none` = grey (default),
   * - `attention` = orange
   * - `error` = red
   * - `success` = green
   */
  state = input<ValueState>(ValueState.none);
}
