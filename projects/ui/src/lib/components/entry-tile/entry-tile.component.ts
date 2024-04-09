import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Output, QueryList, computed, input, output, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { EntryItemComponent } from './entry-item/entry-item.component';
import { EntryKeyValueComponent } from './entry-key-value/entry-key-value.component';
import { ButtonComponent } from '../button';
import { UIBaseComponent } from '../../shared';
import { EntryTileCollapseMode, EntryTileState } from './entry-tile-models';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);


@Component({
  selector: 'ui-entry-tile',
  standalone: true,
  imports: [CommonModule, ClarityModule, EntryItemComponent, EntryKeyValueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entry-tile.component.html',
  styleUrl: './entry-tile.component.scss',
  animations: [
    trigger('fade', [
      state('false', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ opacity: 0 })),
      transition('false => true',  animate('170ms ease-out'))
    ])
  ]
})
export class EntryTileComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(EntryItemComponent) items: QueryList<EntryItemComponent>;
  @ContentChildren(EntryKeyValueComponent) titles: QueryList<EntryKeyValueComponent>;
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

  ngOnDestroy(): void {
    this._timers.forEach(t => t.unsubscribe());
  }

  private prepareItems = () => {
    for (let i = 0; i < this.items.length; i++) {

      // pagination
      if((!this.pageSize() && i >= this.currentPage() * this.maxItems() && i < this.currentPage() *this.maxItems() + this.maxItems())
      || (this.pageSize() > 0 && i >= this.currentPage() * this.pageSize() && i < this.currentPage() * this.pageSize() + this.pageSize())) 
      {
        this.items.get(i).hidden.set(false);
      } else {
        this.items.get(i).hidden.set(true);
      }

      // check for item.title grouping
      if (i > 0 && this.items.get(i-1).title() == this.items.get(i).title() && this.items.get(i-1).hidden() == false) {
        this.items.get(i).showTitle.set(false);
      } else {
        this.items.get(i).showTitle.set(true);
      }
      
    }
  }

  ngAfterContentInit(): void {
    this.prepareItems();
    let errorMessage = '';

    // TODO: Show errors in component is not strategy! Remove?

    if(this.items.length > this.maxItems() && !this.pageSize())
    {
      const msg = `Too many items used! Max. ${this.maxItems()} allowed`;
      errorMessage == '' ? errorMessage = msg : errorMessage = `${errorMessage}; ${msg}`;
    }

    const overMax = super.limitContentChildren(this.titles, this.maxTitles());
    const msg = `Too many key-values used! Max. ${this.maxTitles()} allowed`;
    errorMessage == '' ? errorMessage = msg : errorMessage = `${errorMessage}; ${msg}`;
    
    this.errorMessage.set(errorMessage);
  }
  

  private _timers: Array<Subscription> = [];
  
  public maxTitles = signal(2);
  public maxItems = signal(5);
  public newPage = signal(0);
  public errorMessage = signal<string>('');
  public paginationTooltip = signal<string>('Page ');
  
  /** Represents the collapsed (=true) or expanded (=false) state of the tile.     
   * **Hint**: only applicable if the `collapseMode` is not `disabled`  
   * (default is `false`)  
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
  
  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

  /** Controls if the tile can be collapsed  
   * There are 3 modes:
   * - `Disabled` = no expand or collapse (default)
   * - `Autoexpanded` = only attention and error items shown
   * - `Manual` = all items shown by default, but collapse button shown
   */
  collapseMode = input<EntryTileCollapseMode>(EntryTileCollapseMode.Disabled);

  /**
   * Optional: State of the tile controls the color of the background  
   * The tile background will get colorized in:
   * - `None` = grey (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green  
   * - `Automatic` = based on the item.state it will be calculated
   * See {@link EntryTileState}
   */
  state = input<EntryTileState>(EntryTileState.None);

  /**
   * Computed state if `state` == `automatic`  
   * Uses `titles.state` to grab the worst state found
   */
  calcState = computed(() => {
    if (this.state() == EntryTileState.Automatic) {
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
   * Emits the tile `id()`
   */
  onShowMoreClick = output<string>();

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
          this.prepareItems();
        }
      }));
    }
  }
}
