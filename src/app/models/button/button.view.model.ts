import { BaseViewModel } from "../base.view.model";

export interface ButtonViewModel extends BaseViewModel {
    label?: string;
    
    // Clarity Icon (optional)
    icon?: string;
    
    // Hover Tooltip (html title; optional)
    tooltip?: string;

    // URL link (optional)
    // If specified the button is an <a href ... element that supports open in new window etc.
    href?: string;

    // Size of the Icon
    iconSize?: number;
 
    // If set the whole button is disabled; no click; no styles
    disabled?: boolean;

    // Icon and Label Color can be set (no hover anymore if set; optional)
    color?: string;

    // If set the button is shown with border and padding (false by default)
    filledStyle?: boolean;

    // If filledStyle is set this sets the border of the button (optional)
    borderColor?: string;

    // If filledStyle is set this sets the background color of the button (optional)
    backgroundColor?: string;

    // Spinning wheel is shown
    isLoading?: boolean;

    // Message (not optional if Loading == true)
    isLoadingMessage?: string;

    // Generic identifier for custom usage
    id?: any;
}