import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 *  Style that is used in badge component
 */
export enum BadgeStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

export interface BadgeInterface extends UIBaseComponentInterface {
    label?: string;
    value?: number
    size?: number
    style?: BadgeStyle;
}