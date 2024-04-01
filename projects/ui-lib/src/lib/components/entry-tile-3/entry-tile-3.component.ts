import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Output, QueryList, computed, input, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { EntryTileCollapseMode } from './models/entryTileCollapseMode.model';
import { EntryState } from './models/entryState.model';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { EntryItemComponent } from './entry-item/entry-item.component';
import { EntryKeyValueComponent } from './entry-key-value/entry-key-value.component';
import { TestButtonComponent } from '../test-button/test-button.component';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);


@Component({
  selector: 'ui-entry-tile-3',
  standalone: true,
  imports: [CommonModule, ClarityModule, EntryItemComponent, EntryKeyValueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entry-tile-3.component.html',
  styleUrl: './entry-tile-3.component.scss',
  animations: [
    trigger('fade', [
      state('false', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ opacity: 0 })),
      transition('false => true',  animate('170ms ease-out'))
    ])
  ]
})
export class EntryTile3Component implements AfterContentInit {

  private filterItems= () => {
    for (let i = 0; i < this.items.length; i++) {
      if((!this.pageSize() && i >= this.currentPage() * this.maxItems() && i < this.currentPage() *this.maxItems() + this.maxItems())
      || (this.pageSize() > 0 && i >= this.currentPage() * this.pageSize() && i < this.currentPage() * this.pageSize() + this.pageSize())) 
      {
        this.items.get(i).hidden.set(false);
      } else {
        this.items.get(i).hidden.set(true);
      }
      
    }
  }
  ngAfterContentInit(): void {
    this.filterItems();
    let errorMessage = '';

    if(this.items.length > this.maxItems() && !this.pageSize())
    {
      const msg = `Too many items used! Max. ${this.maxItems()} allowed`;
      errorMessage == '' ? errorMessage = msg : errorMessage = `${errorMessage}; ${msg}`;
    }

    if(this.titles.length > this.maxTitles()) {
      for (let i = this.maxTitles(); i < this.titles.length; i++) {
        this.titles.get(i).hidden.set(true);
        const msg = `Too many key-values used! Max. ${this.maxTitles()} allowed`;
        errorMessage == '' ? errorMessage = msg : errorMessage = `${errorMessage}; ${msg}`;
      }
    } 
    this.errorMessage.set(errorMessage);
  }
  @ContentChildren(EntryItemComponent) items: QueryList<EntryItemComponent>;
  @ContentChildren(EntryKeyValueComponent) titles: QueryList<EntryKeyValueComponent>;
  @ContentChildren(TestButtonComponent) buttons: QueryList<TestButtonComponent>;

  ngOnDestroy(): void {
    this._timers.forEach(t => t.unsubscribe());
  }

  public readonly placeholder = "⏹⏹ ";
  private _timers: Array<Subscription> = [];
  
  public maxTitles = signal(2);
  public maxItems = signal(5);
  public newPage = signal(0);
  public errorMessage = signal<string>('');
  
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
   * Action is called if pagination is enabled and the user   
   * switches the page.
   * @param event {@link Event}
   * @param $item Pagenumber
   */
  public selectPage = (event: Event, $item: number) => {
    if ($item != this.currentPage()) {
      this.newPage.set($item);
      console.log("Set new page: ", $item )
      event?.preventDefault();
      event?.stopPropagation();
      this._timers.push(timer(170).subscribe({
        next: () => {
          this.currentPage.set($item);
          this.filterItems();
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
