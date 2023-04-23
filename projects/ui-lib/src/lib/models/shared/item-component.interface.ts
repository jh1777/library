import { ComponentErrorModel } from "./component-error.model";

export interface IEntryComponent {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
    data?: any;
    component: 'PROPERTY' | 'METRIC';
}