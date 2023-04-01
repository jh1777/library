import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";


export interface PropertyEntryState {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;

    label?: PropertyEntryOptionsState;
    subtitleLabel?: PropertyEntryOptionsState;

    content?: PropertyEntryOptionsState;
    subtitleContent?: PropertyEntryOptionsState;
}

export interface PropertyEntryOptionsState {

    value?: string;
    style?:  string;
    icon?: IconModel;
}