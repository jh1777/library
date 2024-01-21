import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { deepmergeInto } from "deepmerge-ts/*";
import { produce } from "immer";
import { IIO } from "./entry-tile.component.iio.interface";
import { EntryState, EntryTileCollapseMode, EntryTileItem, EntryTileProperty, EntryTileState } from "./entry-tile.component.interface";

@Injectable()
export class EntryTileStore extends ComponentStore<EntryTileState> implements IIO  {

  constructor() {
    super({ 
      title: "",
      collapseMode: EntryTileCollapseMode.disabled,
      header: new Array<EntryTileProperty>(),
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
  public setId = (id: any) => {
    this.mergeValueIntoState({
      id: id
    });
  };

  public setLoading = (state: boolean) => {
    this.mergeValueIntoState({
        isLoading: state
    });
  };
  
  public setCollapseMode = (mode: EntryTileCollapseMode) => {
    this.mergeValueIntoState({
        collapseMode: mode
    });
  };

  public setIsCollapsed = (state: boolean) => {
    this.mergeValueIntoState({
        isCollapsed: state
    });
  };

  public setTileState = (tileState: EntryState) => {
    this.mergeValueIntoState({
        state: tileState
    });
  };


  public setTileTitle = (title: string, icon: string) => {
    this.mergeValueIntoState({
        title: title,
        titleIcon: icon
    });
  };

  public addTileHeader = (headerData: EntryTileProperty) => {
    this.mergeValueIntoState({
        // TODO: How to handle arrays ?
    });
  };
  
  
}