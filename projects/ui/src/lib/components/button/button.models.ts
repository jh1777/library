import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum ButtonStyle {
    /** Small standard petrol button without any borders and backgrounds */
    Simple_primary = 0,
    /** Small standard red button without any borders and backgrounds */
    Simple_destructive = 6,
    /** Primary style button with petrol bg color and white fonts */
    Primary = 1,
    /** Secondary style button with grey bg color and white fonts */
    Secondary = 2,
    /** Blank outline style button with white fill color and petrol borders */
    Outline = 3,
    /** Destructive  style button with red fill color and white fonts */
    Destructive = 4,
    /** Confirmation  style button with green fill color and white fonts */
    Confirm = 5
}

export interface ButtonInterface extends UIBaseComponentInterface {
  label?: string;
  style?: ButtonStyle;
  icon?: string;
  isDisabled?: boolean;
}