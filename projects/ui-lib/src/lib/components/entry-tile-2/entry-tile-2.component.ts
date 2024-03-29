import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, computed, effect, input, signal } from '@angular/core';
import { EntryTile2ItemConfigComponent } from './config/entry-tile-2.item.config.component';
import { EntryTile2TitleConfigComponent } from './config/entry-tile-2.title.config.component';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { Subscription, timer } from 'rxjs';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);

/**
 * Generic State that is used in tiles and items
 */
export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3,
  automatic = 4 // only applies to while entry tile state, not working for title, items
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
export class EntryTile2Component implements OnDestroy {

  ngOnDestroy(): void {
    this._timers.forEach(t => t.unsubscribe());
  }

  public readonly placeholder = "⏹⏹ ";
  private _timers: Array<Subscription> = [];
  
  public maxTitles = signal(2);
  public maxItems = signal(5);
  public newPage = signal(0);
  
  /** Represents the collapsed (=true) or expanded (=false) state of the tile.     
   * **Hint**: only applicable if the `collapseMode` is not `disabled`  
   * (default is false)
   * */
  public isCollapsed = signal(false);

  /**
   * Indicates the current shown page if pagination is used
   */
  public currentPage = signal(0);

  public noOfPages = computed(() => {
    if (this.pageSize() && this.pageSize() > 0) {
      const p = this.calcPagesNeeded(this.items.length, this.pageSize())
      return p;
    } else {
      return 0;
    }
  });

  /**
   * Title configuration objects from class EntryTile2TitleConfigComponent  
   * See {@link EntryTile2TitleConfigComponent}
   */
  @ContentChildren(EntryTile2TitleConfigComponent) titles: QueryList<EntryTile2TitleConfigComponent>;
  /**
   * Item configuration objects from class EntryTile2ItemConfigComponent  
   * See {@link EntryTile2ItemConfigComponent}
   */
  @ContentChildren(EntryTile2ItemConfigComponent) items: QueryList<EntryTile2ItemConfigComponent>;

  /**  General purpose */
  id = input<any>();
  
  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

  /** Controls if the tile can be collapsed  
   * There are 3 modes:
   * - `disabled` = no expand or collapse (default)
   * - `autoexpanded` = only attention and error items shown
   * - `manual` = all items shown by default, but collapse button shown
   */
  collapseMode = input<EntryTileCollapseMode>(EntryTileCollapseMode.disabled);

  /**
   * Optional: State of the tile controls the color of the background  
   * The tile background will get colorized in:
   * - `none` = grey (default), 
   * - `attention` = orange
   * - `error` = red
   * - `success` = green  
   * - `automatic` = based on the item.state it will be calculated
   * See {@link EntryState}
   */
  state = input<EntryState>(EntryState.none);

  /**
   * Computed state if `state` == `automatic`  
   * Uses `titles.state` to grab the worst state found
   */
  calcState = computed(() => {
    if (this.state() == EntryState.automatic) {
      const itemMax = this.items.reduce((highest, current) => {
        return current.state() > highest ? current.state() : highest;
      }, 0);
      const titleMax = this.titles.reduce((highest, current) => {
        return current.state() > highest ? current.state() : highest;
      }, 0);
      return titleMax;
    } else {
      return this.state();
    }
  })

  /** Optional (but recommended): Tile title */
  title = input<string>(null);

  /** Optional: Tile title icon  */
  titleIcon = input<string>(null);

  /**
   * Optional: If you want to show a button a the bottom of the tile you can set the label of it here.  
   * If the label is not set, there will be no button shown.  
   * The button, if you specify a label, will trigger the `onShowMoreClick` output.
   */
  moreButtonLabel = input<string>(null);

  /**
   * Optional: The page size of the tile
   * If not set, no paging is done  
   * **Important:** The maximum item count applies to each page! If `pageSize` is set higher than the maximum, it will be reduced to the maximum!   
   * Maximum: 5
   */
  pageSize = input<number>(null);

  // OUTPUTS

  /**
   * Click event on the Item  
   * Emits the clicked {@link EntryTileItem}
   */
  @Output()
  onItemClick = new EventEmitter<EntryTile2ItemConfigComponent>();

  /**
   * Click event on More Button (if present)  
   * Emits the tile id
   */
  @Output()
  onShowMoreClick = new EventEmitter<any>();

  // Helper
  private calcPagesNeeded = (itemCount: number, pageCount: number): number => {
    let result = Math.floor(itemCount / pageCount);
    if (itemCount % pageCount > 0) {
      result++;
    }
    if (result == 0) {
      result++
    }
    return result;
  }

  // BUTTON ACTIONS
  /**
   * Toggle expand and collapse state on button click
   */
  public toggleCollapsedState() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  /**
   * Show more button was clicked
   * @param event {@link Event}
   */
  public showMoreClicked = (event: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    this.onShowMoreClick.emit(this.id);
  }

  /**
   * An item was clicked - event will emit if item is clickable
   * @param event {@link Event}
   * @param $item {@link EntryTileItem}
   */
  public tileItemClicked = (event: Event, $item: EntryTile2ItemConfigComponent) => {
    if ($item.clickable) {
      event?.preventDefault();
      event?.stopPropagation();
      this.onItemClick.emit($item);
    }
  }

  /**
   * Action is called if pagination is enabled and the user   
   * switches the page.
   * @param event {@link Event}
   * @param $item Pagenumber
   */
  public selectPage = (event: Event, $item: number) => {
    if ($item != this.currentPage()) {
      this.newPage.set($item);
      event?.preventDefault();
      event?.stopPropagation();
      this._timers.push(timer(170).subscribe({
        next: () => {
          this.currentPage.set($item);
        }
      }));
    }
  }

  checkItemTitleDifferences(index: number): boolean {
    if (index == 0) {
      return true;
    }
    if (this.items.length >= index + 1) {
      const curr = this.items.get(index).title();
      const prev = this.items.get(index - 1).title();    
      return prev != curr;
    }
    return true;
  }
}
