import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IIO } from './entry-tile.component.iio.interface';
import { EntryState, EntryTileCollapseMode, EntryTileHeader, EntryTileItem } from './entry-tile.component.interface';
import { EntryTileStore } from './entry-tile.component.store';

@Component({
  selector: 'csgp-v2-entry-tile',
  templateUrl: './entry-tile.component.html',
  styleUrls: ['./entry-tile.component.scss'],
  providers: [EntryTileStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryTileComponent implements AfterViewInit {

  // Internal usage
  private _isCollapsed: boolean = false;
  private _id: any = null;
  private _initializedCallBack: (storeReference: IIO) => void;
  public readonly placeholder = "⏹⏹ ";
  // --------------

  // INPUTS

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.entryTileStore);
    }
  }
  
  // Title + Icon
  @Input() public set title(tileTitle: string) {
    this.entryTileStore.mergeValueIntoState({
      title: tileTitle
    });
  }

  // Title Icon
  @Input() public set titleIcon(titleIcon: string) {
    this.entryTileStore.mergeValueIntoState({
      titleIcon: titleIcon
    });
  }
  
  // Collapsed Mode
  @Input() public set collapseMode(value: EntryTileCollapseMode) {
    this.entryTileStore.mergeValueIntoState({
      collapseMode: value
    });
  }

  // Is Collapsed
  @Input() public set isCollapsed(value: boolean) {
    this.entryTileStore.mergeValueIntoState({
      isCollapsed: value
    });
  }

  // Is Loading
  @Input() public set isLoading(value: boolean) {
    this.entryTileStore.mergeValueIntoState({
      isLoading: value
    });
  }

  // State
  @Input() public set state(value: EntryState) {
    this.entryTileStore.mergeValueIntoState({
      state: value
    });
  }

  // Header Properties Array
  @Input() public set header(value: Array<EntryTileHeader>) {
    this.entryTileStore.mergeValueIntoState({
      header: value
    });
  }

  // Header Properties Array
  @Input() public set items(value: Array<EntryTileItem>) {
    this.entryTileStore.mergeValueIntoState({
      items: value
    });
  }

  // More Button (optional)
  @Input() public set showMoreButtonLabel(value: any) {
    this.entryTileStore.mergeValueIntoState({
      showMoreButtonLabel: value
    });
  }

  // General purpose (optional)
  @Input() public set id(value: any) {
    this.entryTileStore.mergeValueIntoState({
      id: value
    });
  }

  // OUTPUTS

  /**
   * Click event on the Item  
   * Emits the clicked {@link EntryTileItem}
   */
  @Output()
  onItemClick = new EventEmitter<EntryTileItem>();

  /**
   * Click event on More Button (if present)  
   * Emits the tile id
   */
  @Output()
  onShowMoreClick = new EventEmitter<any>();

  // Just placeholder for test
  public errorData;

  constructor(
    public readonly entryTileStore: EntryTileStore
    ) {}

  ngAfterViewInit(): void {
    this.entryTileStore.isCollapsed$.subscribe({
      next: (value) => {
        this._isCollapsed = value;
      }
    });

    this.entryTileStore.id$.subscribe({
      next: (value) => {
        this._id = value;
      }
    });
  }


  // BUTTON ACTIONS

  /**
   * Toggle expand and collapse state on button click
   */
  public toggleCollapsedState() {
    this.entryTileStore.setIsCollapsed(!this._isCollapsed);
  }

  /**
   * Show more button was clicked
   * @param event {@link Event}
   */
  public showMoreClicked = (event: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    this.onShowMoreClick.emit(this._id);
  }

  /**
   * An item was clicked - event will emit if item is clickable
   * @param event {@link Event}
   * @param $item {@link EntryTileItem}
   */
  public tileItemClicked = (event: Event, $item: EntryTileItem) => {
    if ($item.clickable) {
      event?.preventDefault();
      event?.stopPropagation();
      this.onItemClick.emit($item);
    }
  }
}