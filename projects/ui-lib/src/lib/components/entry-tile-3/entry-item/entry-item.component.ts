import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  input,
  signal,
} from '@angular/core';
import { EntryState } from '../models/entryState.model';
import { BadgeComponent } from '../../badge/badge.component';
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
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { TestButtonComponent } from '../../test-button/test-button.component';
ClarityIcons.addIcons(
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisHorizontalIcon,
  ellipsisVerticalIcon,
  popOutIcon,
);

@Component({
  selector: 'ui-entry-item',
  standalone: true,
  imports: [CommonModule, ClarityModule, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entry-item.component.html',
  styleUrl: './entry-item.component.scss',
})
export class EntryItemComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  @ContentChildren(TestButtonComponent) buttons: QueryList<TestButtonComponent>;

  ngAfterContentInit(): void {
    if(this.badges.length > 1) {
      for (let i = 1; i < this.badges.length; i++) {
        this.badges.get(i).hidden.set(true);
      }
    }

    if(this.buttons.length > 1) {
      for (let i = 1; i < this.buttons.length; i++) {
        this.buttons.get(i).hidden.set(true);
      }
    }
  }

  public readonly placeholder = '⏹⏹ ';

  hidden = signal<boolean>(false);
  showTitle = signal<boolean>(true);

  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);
  /**
   * Optional: Group Title to be shown at the top of the item itself
   */
  title = input<string>();

  /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`)
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `none` = grey (default),
   * - `attention` = orange
   * - `error` = red
   * - `success` = green
   */
  state = input<EntryState>(EntryState.none);

  /** Is the Item clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
  clickable = input<boolean>(false);

  /** Primary Value is shown on top (line 1) inside the item box */
  primaryValue = input.required<string>();

  /** Secondary Value is shown on top (line 2) inside the item box in grey color */
  secondaryValue = input<string>();

  /** If yes, the item will show a state icon in addition to the background color */
  showStateIcon = input<boolean>(false);

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
   * Emits the clicked {@link EntryTileItem}
   */
  @Output()
  onItemClick = new EventEmitter<any>();

  /**
   * An item was clicked - event will emit if item is clickable
   * @param event {@link Event}
   * @param $item {@link EntryTileItem}
   */
  public tileItemClicked = (event: Event, $item: any) => {
    if ($item.clickable) {
      event?.preventDefault();
      event?.stopPropagation();
      this.onItemClick.emit($item);
    }
  };
}
