import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";
import { IIO } from "./entry-tile.component.iio.interface";
import { EntryState, EntryTileCollapseMode, EntryTileHeader, EntryTileItem, EntryTileState } from "./entry-tile.component.interface";

@Injectable()
export class EntryTileStore extends ComponentStore<EntryTileState> implements IIO  {

  private readonly _MAX_ITEMS = 5;
  private readonly _MAX_HEADER_ITEMS = 2;

  /** Number of pages */
  private _noOfPages: number = 0;
  public get noOfPages(): number {
    return this._noOfPages;
  }

  constructor() {
    super({ 
      title: "<Title>",
      collapseMode: EntryTileCollapseMode.disabled,
      header: new Array<EntryTileHeader>(),
      isCollapsed: false,
      isLoading: false,
      items: new Array<EntryTileItem>(),
      state: EntryState.none,
      currentPage: 0
    });
  }

  // Getter
  readonly isLoading$ = this.select(state => state.isLoading);
  readonly title$ = this.select(state => state.title);
  readonly collapseMode$ = this.select(state => state.collapseMode);
  readonly header$ = this.select(state => state.header);
  readonly isCollapsed$ = this.select(state => state.isCollapsed);
  readonly items$ = this.select(state => {
    if (state.pageSize && state.pageSize > 0) {
      const startIndex = state.currentPage * state.pageSize;
      var endIndex = state.currentPage * state.pageSize + state.pageSize;
      return state.items.slice(startIndex, endIndex).filter(value => value != undefined && value != null);
    } else {
      return state.items.slice(state.currentPage * this._MAX_ITEMS, state.currentPage * this._MAX_ITEMS + this._MAX_ITEMS)
    }
  });
  readonly tileState$ = this.select(state => state.state);
  readonly titleIcon$ = this.select(state => state.titleIcon);
  readonly showMoreButtonLabel$ = this.select(state => state.showMoreButtonLabel);
  readonly pageSize$ = this.select(state => state.pageSize);
  readonly currentPage$ = this.select(state => state.currentPage);
  readonly id$ = this.select(state => state.id);

  // REDUCER
  public mergeValueIntoState = this.updater((state: EntryTileState, value: Partial<EntryTileState>) => {
    const newState = produce(state, (draft) => {
        deepmergeInto(draft, value);
    })
    return (newState);
  });

  // Helper
  private calcPagesNeeded(itemCount: number, pageCount: number): number {
    let result = Math.floor(itemCount / pageCount);
    if (itemCount % pageCount > 0) {
      result++;
    }
    if (result == 0) {
      result++
    }
    return result;
  }

  // Setter
  public readonly setId = (id: any) => {
    this.mergeValueIntoState({
      id: id
    });
  };

  public readonly setLoading = (state: boolean) => {
    this.mergeValueIntoState({
        isLoading: state
    });
  };
  
  public readonly setCollapseMode = (mode: EntryTileCollapseMode) => {
    this.mergeValueIntoState({
        collapseMode: mode
    });
  };

  public readonly setIsCollapsed = (state: boolean) => {
    this.mergeValueIntoState({
        isCollapsed: state
    });
  };

  public readonly setTileState = (tileState: EntryState) => {
    this.mergeValueIntoState({
        state: tileState
    });
  };

  public readonly setCurrentPage = (page: number) => {
    this.mergeValueIntoState({
        currentPage: page
    });
  };

  public readonly setTileTitle = (title: string, icon: string) => {
    this.mergeValueIntoState({
        title: title,
        titleIcon: icon
    });
  };

  public readonly setShowMoreButtonLabel = (label: string) => {
    this.mergeValueIntoState({
        showMoreButtonLabel: label
    });
  };

  // Add one header property to the tile
  public readonly addTileHeader = (item: EntryTileHeader) => {
    this.addTileHeaderReducer(item);
  }

  private readonly addTileHeaderReducer = this.updater((state, item: EntryTileHeader) => {
    if (state.header.length >= this._MAX_HEADER_ITEMS) {
      return state;
    }

    const newstate = produce(state, draft => {
      draft.header = draft.header.concat(item);
    });
    return (newstate);
  });

  // Add one item to the tile
  public readonly addTileItems = (items: Array<EntryTileItem>) => {
    if (items && items?.length > 0) {
      items.forEach(item => this.addTileItemReducer(item));
    }
  }

  public readonly addTileItem = (item: EntryTileItem) => {
      this.addTileItemReducer(item);
  }


  public readonly setPageSize = this.updater((state, size: number) => {
    if (size && size > 0) {
      // Calc number of pages we have right now
      this._noOfPages = this.calcPagesNeeded(state.items.length, size);
    } else {
      this.noOfPages == 0;
    }

    const newstate = produce(state, draft => {
      draft.pageSize = size;
    });
    return (newstate);
  });

  private readonly addTileItemReducer = this.updater((state, item: EntryTileItem) => {

    // If a null item was added -> ignore
    if (!item) {
      return state;
    }

    if (state.pageSize && state.pageSize > 0) {
      // Calc number of pages we have right now
      this._noOfPages = this.calcPagesNeeded(state.items.length + 1, state.pageSize);
    } else {
      this.noOfPages == 0;
    }

    const newstate = produce(state, draft => {
      draft.items = draft.items.concat(item);
    });
    return (newstate);
  });
}