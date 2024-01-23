import { EntryState, EntryTileCollapseMode, EntryTileItem, EntryTileProperty, EntryTileState } from "./entry-tile.component.interface";

export interface IIO {
    setTileTitle: (title: string, icon: string) => void;
    setTileState: (state: EntryState) => void;
    setIsCollapsed: (state: boolean) => void;
    setCollapseMode: (mode: EntryTileCollapseMode) => void;
    setLoading: (state: boolean) => void;
    setId: (id: any) => void;
    addTileHeader: (data: EntryTileProperty) => void;
    addTileItem: (item: EntryTileItem) => void;
}