import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 *  Style that is used in key value entry component
 */
export enum EntryKeyValueStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3,
    Dimmed = 4
}

export interface EntryKeyValueItemInterface extends UIBaseComponentInterface {
    label: string;
    value: string;
    style?: EntryKeyValueStyle;
    isBig?: boolean;
}