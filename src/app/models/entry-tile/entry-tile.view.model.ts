import { ComponentErrorModel } from "@ui";
import { EntryState, EntryTileCollapseMode, EntryTileItem, EntryTileProperty } from "projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.interface";
import { BaseViewModel } from "../base.view.model";

export interface EntryTileViewModel extends BaseViewModel {
    id?: any;
    isLoading: boolean;
    errorData?: ComponentErrorModel;
    title: string,
    collapseMode?: EntryTileCollapseMode;
    header?: Array<EntryTileProperty>;
    isCollapsed: boolean;
    items?: Array<EntryTileItem>;
    state: EntryState;
    titleIcon?: string;
}