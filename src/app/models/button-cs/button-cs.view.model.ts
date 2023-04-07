import { BaseViewModel } from "../base.view.model";

export interface ButtonCSViewModel extends BaseViewModel {
    id?: any;
    label?: string;
    isLoading?: boolean;
    isLoadingMessage?: string;
    icon?: string;
    tooltip?: string;
    href?: string;
    iconSize?: number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    filledStyle?: boolean;
    disabled?: boolean;
}