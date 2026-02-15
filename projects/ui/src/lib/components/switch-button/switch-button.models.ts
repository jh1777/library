import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Interface for SwitchButton option configuration
 */
export interface SwitchButtonOption {
  /** Label text for the option */
  label: string;
  /** Optional icon for the option (Font Awesome icon) */
  icon?: IconDefinition;
  /** Value associated with this option */
  value: any;
}

/**
 * Interface for SwitchButton component
 */
export interface SwitchButtonInterface extends UIBaseComponentInterface {
  /** Array of two options for the switch button */
  options?: SwitchButtonOption[];
  /** Currently selected value */
  selectedValue?: any;
  /** Whether the component is disabled */
  isDisabled?: boolean;
}
