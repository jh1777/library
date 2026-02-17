import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Interface for SwitchButton component
 */
export interface SwitchButtonInterface extends UIBaseComponentInterface {
  /** Currently selected value */
  selectedValue?: string | number | boolean;
  /** Whether the component is disabled */
  isDisabled?: boolean;
}
