import { UIBaseComponentInterface } from "../../../shared/ui-base.models";
import { CardStyle } from "../card.models";

export interface CardSectionBasicInterface extends UIBaseComponentInterface {
    text?: string;
    header?: string;
    list?: Array<string>;
    style?: CardStyle;
    styledMessage?: string;
    showStyledBackground?: boolean;
}