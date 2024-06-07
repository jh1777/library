import { UIBaseComponentInterface } from "../../../../shared/ui-base.models";
import { AccordionPanelHeaderStyle } from "../../accordion.models";

export interface AccordionPanelHeaderInterface extends UIBaseComponentInterface {
    label: string;
    style?: AccordionPanelHeaderStyle;
}