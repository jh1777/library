import { ComponentErrorModel } from "./component-error.model";

export interface IPropertyComponent {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    data?: any;
    component: 'KEY-VALUE-DOUBLE' | 'METRIC-ENTRY';
}