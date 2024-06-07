import { UIBaseComponentInterface } from "../../../shared/ui-base.models";
import { BadgeStyle } from "../../badge";

export interface TabInterface extends UIBaseComponentInterface {
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  badgeValue?: number;
  badgeStyle?: BadgeStyle;
}