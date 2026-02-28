import { UIBaseComponentInterface } from '../../shared/ui-base.models';

export interface DrawerInterface extends UIBaseComponentInterface {
    isOpen?: boolean;
    header?: string;
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean;
}
