import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class EntryTileComponent implements OnInit {

  private _initializedCallBack: (storeReference: IIO) => void;

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

  // General purpose (optional)
  @Input() public set id(value: any) {
    this.entryTileStore.mergeValueIntoState({
      id: value
    });
  }


  @Output()
  onClick = new EventEmitter<EntryTileItem>();

  //----------

  public placeholder = "⏹⏹ ";

  // Just placeholder for test
  public errorData;

  constructor(
    public readonly entryTileStore: EntryTileStore
    ) {
  }

  // Private
  private _isCollapsed: boolean = false;

  ngOnInit(): void {
    this.entryTileStore.isCollapsed$.subscribe({
      next: (value) => {
        this._isCollapsed = value;
      }
    });
  }

  public toggleCollapsedState() {
    //this.data.isCollapsed = !this.data.isCollapsed;
    this.entryTileStore.setIsCollapsed(!this._isCollapsed);
  }

  public tileItemClicked(event: Event, $item: EntryTileItem) {
    event.preventDefault();
    event.stopPropagation();
    this.onClick.emit($item);
  }
}