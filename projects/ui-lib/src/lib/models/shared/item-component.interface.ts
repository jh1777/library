
import { MetricEntryModel } from "../../components/metric-entry";
import { PropertyEntryModel } from "../../components/property-entry";
import { ComponentErrorModel } from "./component-error.model";

export interface IPropertyComponent {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    data?: PropertyEntryModel | MetricEntryModel;
    component: 'KEY-VALUE-DOUBLE' | 'METRIC-BAR';
}