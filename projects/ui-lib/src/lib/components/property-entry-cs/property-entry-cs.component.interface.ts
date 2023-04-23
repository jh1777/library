import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";


export interface PropertyEntryState {
    isLoading?: boolean;
    errorData?: ComponentErrorModel;
/* new
    label: string;
    labelStyle?: string;
    labelIcon?: IconModel;

    subtitle: string;
    subtitleStyle?: string;
    subtitleIcon?: IconModel;

    value: string;
    valueStyle?: string;
    valueIcon?: IconModel;

    valueSubtitle: string;
    valueSubtitleStyle?: string;
    valueSubtitleIcon?: IconModel;
*/
    
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