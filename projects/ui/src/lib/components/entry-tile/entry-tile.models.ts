import { UIBaseComponentInterface } from "../../shared/ui-base.models";
import { EntryKeyValueItemInterface } from "../entry-key-value";
import { EntryTileItemInterface } from "./entry-tile-item/entry-tile-item.models";

/**
 * Generic Style that is used in tiles and items
 */
export enum EntryTileStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3,
    Automatic = 4 // only applies to while entry tile style, not working for title, items
}

export enum EntryTileCollapseMode {
    /**  All items shown by default, no collapse button */
    Disabled = 0,
    /** All items shown by default, but collapse button shown */
    Manual = 1,
    /** Only attention and error items shown */
    Autoexpanded = 2,
}
  
export interface EntryTileInterface extends UIBaseComponentInterface {
    header?: string;
    headerIcon?: string;
    description?: string;
    style?: EntryTileStyle;
    collapseMode?: EntryTileCollapseMode;
    keyValues?: EntryKeyValueItemInterface[];
    items?: EntryTileItemInterface[];
    isCollapsed?: boolean;
    moreButtonLabel?: string;
    pageSize?: number;
}