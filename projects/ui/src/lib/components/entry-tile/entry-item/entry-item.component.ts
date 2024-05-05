import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  input,
  output,
  signal,
} from '@angular/core';
import { BadgeComponent } from '../../badge';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisVerticalIcon,
  ellipsisHorizontalIcon,
  popOutIcon,
  playIcon,
  stopIcon,
  pauseIcon,
  refreshIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ButtonComponent } from '../../button';
import { SwitchComponent } from '../../switch';
import { UIBaseComponent } from '../../../shared';
import { EntryItemStyle } from './entry-item.models';
ClarityIcons.addIcons(
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisHorizontalIcon,
  ellipsisVerticalIcon,
  popOutIcon,
  playIcon,
  stopIcon,
  pauseIcon,
  refreshIcon
);

@Component({
  selector: 'ui-entry-item',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entry-item.component.html',
  styleUrl: './entry-item.component.scss',
})
export class EntryItemComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, 1);
    super.limitContentChildren(this.buttons, 2);
    super.limitContentChildren(this.switches, 1);
  }

  /** 
   * INTERNAL  
   */
  showTitle = signal<boolean>(true);

  /**
   * Optional: Group header to be shown at the top of the item itself
   */
  header = input<string>();

  /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`)
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `None` = grey (default),
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   */
  style = input<EntryItemStyle>(EntryItemStyle.None);

  /** Is the Item clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
  clickable = input<boolean>(false);

  /** Primary Value is shown on top (line 1) inside the item box */
  primaryValue = input.required<string>();

  /** Secondary Value is shown on top (line 2) inside the item box in grey color */
  secondaryValue = input<string>();

  /** If yes, the item will show a state icon in addition to the background color */
  showStateIcon = input<boolean>(true);

  /** Optional: Tooltip message (simple) wich is displayed on mouse over as html title */
  tooltip = input<string>();

  /** Optional: Icon to show at the right inside the item (clarity design icon name)
   * Only works if `showStateIcon == false`!
   * Intended mostly for usage as a clickable item to show that this is a link
   * Will be colorized grey by default. If the item has `clickable == true` its shown in default action color
   *
   */
  icon = input<string>();

  /**
   * Click event on the Item  
   * Emits the `id()` of the item
   */
  onItemClick = output<string>();
}
