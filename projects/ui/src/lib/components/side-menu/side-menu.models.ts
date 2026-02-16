import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SideMenuItem {
    /** Label text for the menu item */
    label: string;
    /** Optional icon for the menu item (Font Awesome icon) */
    icon?: IconDefinition;
    /** Value associated with this menu item */
    value: string | number | boolean;
    /** If set to `true` this menu item is disabled and can't be clicked (optional) */
    isDisabled?: boolean;
}

export interface SideMenuSection {
    /** Optional section title */
    title?: string;
    /** Array of menu items in this section */
    items: SideMenuItem[];
}