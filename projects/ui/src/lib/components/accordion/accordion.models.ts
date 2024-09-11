import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum AccordionPanelHeaderStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

export interface AccordionInterface extends UIBaseComponentInterface {
    header?: string;
    description?: string;
}