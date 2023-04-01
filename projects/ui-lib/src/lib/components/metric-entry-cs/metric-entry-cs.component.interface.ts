import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";


export interface MetricEntryState {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    
    label?: MetricEntryLabelState;
    value?: MetricEntryValueState;
}

export interface MetricEntryLabelState {
    value?: string;
    style?:  string;
    icon?: IconModel;
}

export interface MetricEntryValueState {
    value: number;
    percent?: number;
    color?: string;
}