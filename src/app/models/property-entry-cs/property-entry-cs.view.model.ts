import { ComponentErrorModel, IconModel } from "@ui";
import { BaseViewModel } from "../base.view.model";

export interface PropertyEntryCSViewModel extends BaseViewModel {
    id?: any;
    isLoading: boolean;
    errorData?: ComponentErrorModel;
    
    label: string;
    labelStyle?: string;
    labelIcon?: IconModel;

    subtitle: string;
    subtitleStyle?: string;
    subtitleIcon?: IconModel;

    value?: string;
    valueStyle?: string;
    valueIcon?: IconModel;

    valueSubtitle?: string;
    valueSubtitleStyle?: string;
    valueSubtitleIcon?: IconModel;
}