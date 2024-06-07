import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum ModalSize {
    XSmall = 0,
    Small = 1,
    Medium = 2,
    Large = 3,
    XLarge = 4
}

export interface ModalInterface extends UIBaseComponentInterface {
    isOpen?: boolean;
    header?: string;
    width?: ModalSize;
    height?: ModalSize;
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean;
}