import { IconModel } from "../../models/shared/icon-model";

export class PropertyEntryModel {
    
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

    xlabel?: PropertyEntryOptions;
    subtitleLabel?: PropertyEntryOptions;

    content?: PropertyEntryOptions;
    subtitleContent?: PropertyEntryOptions;

    constructor(init?: Partial<PropertyEntryModel>) {
        Object.assign(this, init);
    }
}

export class PropertyEntryOptions {

    value?: string;
    style?:  string;
    icon?: IconModel;

    constructor(init?: Partial<PropertyEntryOptions>) {
        Object.assign(this, init);
    }
}