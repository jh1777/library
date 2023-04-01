import { IconModel } from "../../models/shared/icon-model";

export class PropertyEntryModel {
    
    label?: PropertyEntryOptions;
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