import { UIBaseComponentInterface } from "../../../shared/ui-base.models";

export interface ConfirmationModalInterface extends UIBaseComponentInterface {
  isOpen?: boolean;
  header?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  message?: string;
}