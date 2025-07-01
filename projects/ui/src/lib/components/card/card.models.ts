import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum CardStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3,
    Highlight = 4
}

export interface CardInterface extends UIBaseComponentInterface {
    header: string;
    style?: CardStyle;
}