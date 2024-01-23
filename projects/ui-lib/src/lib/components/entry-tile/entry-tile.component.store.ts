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

  constructor() {
    super({ 
      title: "",
      collapseMode: EntryTileCollapseMode.disabled,
      header: new Array<EntryTileHeader>(),
      isCollapsed: false,
      isLoading: false,
      items: new Array<EntryTileItem>(),
      state: EntryState.none,
      titleIcon: null,
      id: null
    });
  }

  // Getter
  readonly isLoading$ = this.select(state => state.isLoading);
  readonly title$ = this.select(state => state.title);
  readonly collapseMode$ = this.select(state => state.collapseMode);
  readonly header$ = this.select(state => state.header);
  readonly isCollapsed$ = this.select(state => state.isCollapsed);
  readonly items$ = this.select(state => state.items);
  readonly tileState$ = this.select(state => state.state);
  readonly titleIcon$ = this.select(state => state.titleIcon);
  readonly id$ = this.select(state => state.id);
  
  // REDUCER
  public mergeValueIntoState = this.updater((state: EntryTileState, value: Partial<EntryTileState>) => {
    const newState = produce(state, (draft) => {
        deepmergeInto(draft, value);
    })
    return (newState);
  });

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


  public readonly setTileTitle = (title: string, icon: string) => {
    this.mergeValueIntoState({
        title: title,
        titleIcon: icon
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
  public readonly addTileItem = (item: EntryTileItem) => {
    this.addTileItemReducer(item);
  }

  private readonly addTileItemReducer = this.updater((state, item: EntryTileItem) => {
    if (state.items.length >= this._MAX_ITEMS) {
      return state;
    }

    const newstate = produce(state, draft => {
      draft.items = draft.items.concat(item);
    });
    return (newstate);
  });
}