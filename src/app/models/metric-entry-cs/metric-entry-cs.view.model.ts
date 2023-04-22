import { ComponentErrorModel, IconModel } from "@ui";
import { BaseViewModel } from "../base.view.model";

export interface MetricEntryCSViewModel extends BaseViewModel {
    id?: any;
    isLoading: boolean;
    errorData?: ComponentErrorModel;
    label: string;
    labelStyle?: string;
    labelIcon?: IconModel;
    metricValue: number;
    metricPercent?: number;
    metricColor?: string;
    showMetricPercantageLabel?: boolean;
    metricAdditionalLabel?: string;
}