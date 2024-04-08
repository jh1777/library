
//import { signalStore, withState } from '@ngrx/signals';

import { EntryTileCollapseMode, EntryTileState } from "./entry-tile-models";

type EntryTile3State = {
    isCollapsed: boolean;
    currentPage: number;
    id: any;
    isLoading: boolean;
    collapseMode: EntryTileCollapseMode;
    state: EntryTileState;
    title: string;
    titleIcon: string;
    moreButtonLabel: string;
    pageSize: number;
}

const initialState: EntryTile3State = {
    isCollapsed: false,
    collapseMode: EntryTileCollapseMode.Disabled,
    currentPage: 0,
    id: null,
    isLoading: false,
    moreButtonLabel: null,
    pageSize: 0,
    state: EntryTileState.None,
    title: null,
    titleIcon: null
}

//export const EntryTile3Store = signalStore(
//    withState(initialState)
//  );