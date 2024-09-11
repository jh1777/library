import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum EntryMetricStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

export interface EntryMetricInterface extends UIBaseComponentInterface {
    percent?: number;
    style?: EntryMetricStyle;
}