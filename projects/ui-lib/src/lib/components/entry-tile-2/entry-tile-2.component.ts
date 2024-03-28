import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { EntryTile2ItemConfigComponent } from './config/entry-tile-2.item.config.component';
import { EntryTile2TitleConfigComponent } from './config/entry-tile-2.title.config.component';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon
);

/**
 * Generic State that is used in tiles and items
 */
export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3,
}

export enum EntryTileCollapseMode {
  /**  All items shown by default, no collapse button */
  disabled = 0,
  /** All items shown by default, but collapse button shown */
  manual = 1,
  /** Only attention and error items shown */
  autoexpanded = 2,
}



@Component({
  selector: 'ui-entry-tile',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './entry-tile-2.component.html',
  styleUrl: './entry-tile-2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      state('false', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ opacity: 0 })),
      transition('false => true',  animate('170ms ease-out'))
    ])
  ]
})
export class EntryTile2Component {
  public readonly placeholder = "⏹⏹ ";

  @ContentChildren(EntryTile2TitleConfigComponent) titles: QueryList<EntryTile2TitleConfigComponent>;

  @ContentChildren(EntryTile2ItemConfigComponent) items: QueryList<EntryTile2ItemConfigComponent>;


  @Input()
  /**  General purpose */
  id?: any;

  // states
  /** Indicates whether the content is still loading */
  @Input()
  isLoading: boolean = false;

  /** Represents the collapsed (=true) or expanded (=false) state of the tile.     
   * **Hint**: only applicable if the `collapseMode` is not `disabled`  
   * (default is false)
   * */
  @Input()
  isCollapsed?: boolean; 
  
  /** Controls if the tile can be collapsed  
   * There are 3 modes:
   * - `disabled` = no expand or collapse (default)
   * - `autoexpanded` = only attention and error items shown
   * - `manual` = all items shown by default, but collapse button shown
   */
  @Input()
  collapseMode: EntryTileCollapseMode;

  /**
   * Optional: State of the tile controls the color of the background  
   * The tile background will get colorized in:
   * - `none` = grey (default), 
   * - `attention` = orange
   * - `error` = red
   * - `success` = green  
   * See {@link EntryState}
   */
  @Input()
  state?: EntryState;

  /** Optional but recommended: Tile title 
  */
  @Input()
  title?: string;

  /** Optional: Tile title icon (not recommended to use) */
  @Input()
  titleIcon?: string;

  /**
   * Optional: If you want to show a button a the bottom of the tile you can set the label of it here.  
   * If the label is not set, there will be no button shown.  
   * The button, if you specify a label, will trigger the `onShowMoreClick` output.
   */
  @Input()
  showMoreButtonLabel?: string;

  /**
   * Optional: The page size of the tile
   * If not set, no paging is done  
   * **Important:** The maximum item count applies to each page! If `pageSize` is set higher than the maximum, it will be reduced to the maximum!   
   * Maximum: 5
   */
  @Input()
  pageSize?: number;

  /**
   * Optional: The current page that is shown   
   * Only applicable if `pageSize` is set to > 1  
   */
  @Input()
  currentPage?: number;



  public toggleCollapsedState() {

  }
}
