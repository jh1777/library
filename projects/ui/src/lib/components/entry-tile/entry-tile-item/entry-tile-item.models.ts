import { UIBaseComponentInterface } from "../../../shared/ui-base.models";

/**
 *  Style that is used in entry item component
 */
export enum EntryItemStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

export interface EntryTileItemInterface extends UIBaseComponentInterface {
    header?: string;
    style?: EntryItemStyle;
    isClickable?: boolean;
    primaryValue?: string;
    secondaryValue?: string;
    showStateIcon? :boolean;
    icon?: string;
}