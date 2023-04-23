import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";


export interface MetricEntryState {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    id?: any;
    label: string;
    labelStyle?: string;
    labelIcon?: IconModel;
    metricValue: number;
    metricPercent?: number;
    metricColor?: string;
    showMetricPercantageLabel?: boolean;
    metricAdditionalLabel?: string;
}