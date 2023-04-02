import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";


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

    id?: any;
}