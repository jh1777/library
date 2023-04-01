import { ComponentErrorModel } from "src/app/models/component-error.model";
import { IconModel } from "src/app/models/icon-model";

export interface DrawerEntryState {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    
    title: string;
    titleIcon?: IconModel;
    subtitle?: string;
    progressPercent?: number;
    progressColor?: string;
    showProgress: boolean;
    progressStatusLabel?: string;
    description?: string;
}