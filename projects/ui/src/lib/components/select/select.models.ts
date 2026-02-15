import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Style that is used in select component
 */
export enum SelectStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

/**
 * Select option interface
 */
export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectInterface extends UIBaseComponentInterface {
    label?: string;
    placeholderText?: string;
    options?: SelectOption[];
    value?: string | number;
    isDisabled?: boolean;
    style?: SelectStyle;
}
