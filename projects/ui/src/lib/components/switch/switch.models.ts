import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export interface SwitchInterface extends UIBaseComponentInterface {
  label?: string;
  state?: boolean;
  isDisabled?: boolean;
}