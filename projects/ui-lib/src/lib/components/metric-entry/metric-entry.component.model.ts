import { IconModel } from "../../models/shared/icon-model";

export class MetricEntryModel {

    label?: MetricEntryLabelOptions;
    measure?: MetricEntryMeasureOptions;

    constructor(init?: Partial<MetricEntryModel>) {
        Object.assign(this, init);
    }
}

export class MetricEntryLabelOptions {
    value?: string;
    style?:  string;
    icon?: IconModel;

    constructor(init?: Partial<MetricEntryLabelOptions>) {
        Object.assign(this, init);
    }
}

export class MetricEntryMeasureOptions {
    value: number;
    percent?: number;
    color?: string;
    constructor(init?: Partial<MetricEntryMeasureOptions>) {
        Object.assign(this, init);
    }
}