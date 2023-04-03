import { IconModel } from "@ui";
import { BaseViewModel } from "../base.view.model";

export interface DrawerEntryViewModel extends BaseViewModel {
    title: string;
    titleIcon: IconModel;
    subtitle?: string;
    progressPercent?: number;
    progressColor?: string;
    showProgress?: boolean;
    progressStatusLabel?: string;
    description?: string;
    isLoading?: boolean;
    ref?: any;
    id?: any;
}