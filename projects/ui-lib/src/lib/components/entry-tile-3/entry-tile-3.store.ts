import { EntryState } from "./models/entryState.model";
import { EntryTileCollapseMode } from "./models/entryTileCollapseMode.model";
//import { signalStore, withState } from '@ngrx/signals';

type EntryTile3State = {
    isCollapsed: boolean;
    currentPage: number;
    id: any;
    isLoading: boolean;
    collapseMode: EntryTileCollapseMode;
    state: EntryState;
    title: string;
    titleIcon: string;
    moreButtonLabel: string;
    pageSize: number;
}

const initialState: EntryTile3State = {
    isCollapsed: false,
    collapseMode: EntryTileCollapseMode.disabled,
    currentPage: 0,
    id: null,
    isLoading: false,
    moreButtonLabel: null,
    pageSize: 0,
    state: EntryState.none,
    title: null,
    titleIcon: null
}

//export const EntryTile3Store = signalStore(
//    withState(initialState)
//  );