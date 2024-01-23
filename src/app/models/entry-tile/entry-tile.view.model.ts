import { ComponentErrorModel } from "@ui";
import { EntryState, EntryTileCollapseMode, EntryTileHeader, EntryTileItem } from "projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.interface";
import { BaseViewModel } from "../base.view.model";

export interface EntryTileViewModel extends BaseViewModel {
    id?: any;
    isLoading: boolean;
    errorData?: ComponentErrorModel; // TODO!
    title?: string,
    collapseMode?: EntryTileCollapseMode;
    header?: Array<EntryTileHeader>;
    isCollapsed?: boolean;
    items?: Array<EntryTileItem>;
    state?: EntryState;
    titleIcon?: string;
}