import { Observable } from "rxjs";
import { EntryState, EntryTileCollapseMode, EntryTileHeader, EntryTileItem } from "./entry-tile.component.interface";

export interface IIO {
    title$: Observable<string>;
    isLoading$: Observable<boolean>;
    collapseMode$: Observable<EntryTileCollapseMode>;
    header$: Observable<EntryTileHeader[]>;
    isCollapsed$: Observable<boolean>;
    items$: Observable<EntryTileItem[]>;
    tileState$: Observable<EntryState>;
    titleIcon$: Observable<string>;
    showMoreButtonLabel$: Observable<string>;
    id$: Observable<any>;

    setTileTitle: (title: string, icon: string) => void;
    setTileState: (state: EntryState) => void;
    setIsCollapsed: (state: boolean) => void;
    setCollapseMode: (mode: EntryTileCollapseMode) => void;
    setLoading: (state: boolean) => void;
    setId: (id: any) => void;
    addTileHeader: (data: EntryTileHeader) => void;
    addTileItem: (item: EntryTileItem) => void;
    setShowMoreButtonLabel: (label: string) => void;
}