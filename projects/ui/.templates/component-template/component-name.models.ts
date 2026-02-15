import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Style options for ComponentName component
 */
export enum ComponentNameStyle {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Error = 4,
    Attention = 5
}

/**
 * Interface for ComponentName component
 */
export interface ComponentNameInterface extends UIBaseComponentInterface {
    propertyName?: string;
    style?: ComponentNameStyle;
}
