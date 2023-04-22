import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { IIO } from "./metric-entry-cs.component.iio.interface";
import { MetricEntryState } from "./metric-entry-cs.component.interface";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";

@Injectable()
export class MetricEntryStore extends ComponentStore<MetricEntryState> implements IIO  {
    constructor() {
        super({ 
            isLoading: false, 
            errorData: null,
            label: "Label",
            metricValue: 0,
            metricPercent: 0
        });
    }

    setLoading = (state: boolean) => {
        this.mergeValueIntoState({
            isLoading: state
        });
    };

    setError = (message: string, showLink: boolean = false) => {
        if (message) {
            const err = new ComponentErrorModel({
                hasError: true,
                message: message,
                showLink: showLink
            });
            this.mergeValueIntoState({
                errorData: err
            });
        }
    }
    
    setValue = (
        label: string, 
        value: number, 
        percent: number = null, 
        labelStyle: string = null, 
        valueColor: string = null
        ) => {

        const data: Partial<MetricEntryState> = {
            label: label,
            labelStyle: labelStyle,
            metricValue: value,
            metricPercent: percent,
            metricColor: valueColor,
            isLoading: false
        };
        this.mergeValueIntoState(data);
    };

    setIcon = (
        icon: string, 
        clickable?: boolean, 
        color?: string, 
        size?: number, 
        tooltip?: string, 
        source?: "clarity" | "fontawesome"
        ) => {
            const config: IconModel = {

                iconName: icon,
                source: source,
                size: size,
                color: color,
                isClickable: clickable,
                tooltip: tooltip

            };
            this.mergeValueIntoState( { labelIcon: config });

    };


    // GETTERS
    //-------------

    readonly isLoading$ = this.select(state => state.isLoading, { debounce: true });
    // Error 
    readonly hasError$ = this.select(state => state.errorData?.hasError, { debounce: true });
    readonly errorMessage$ = this.select(state => state.errorData?.message, { debounce: true });
    readonly errorShowLink$ = this.select(state => state.errorData?.showLink, { debounce: true });

    // Label
    readonly label$ = this.select(state => state.label, { debounce: true });
    readonly labelStyle$ = this.select(state => state.labelStyle, { debounce: true });
    readonly labelIcon$ = this.select(state => state.labelIcon, { debounce: true });
    readonly labelIconClickable$ = this.select(state => state.labelIcon?.isClickable, { debounce: true });
    
    // Metric
    readonly metricValue$ = this.select(state => state.metricValue, { debounce: true });
    readonly metricColor$ = this.select(state => state.metricColor, { debounce: true });
    readonly metricPercent$ = this.select(state => state.metricPercent, { debounce: true });

    // Add
    readonly metricAdditionalLabel$ = this.select(state => state.metricAdditionalLabel, { debounce: true });
    readonly showMetricPercantageLabel$ = this.select(state => state.showMetricPercantageLabel, { debounce: true });
    
    readonly showPctBar$ = this.select(state => !state.isLoading && (state.metricPercent != null && state.metricPercent != undefined), { debounce: true });

    // REDUCER

    public mergeValueIntoState = this.updater((state: MetricEntryState, value: Partial<MetricEntryState>) => {
        const newState = produce(state, (draft) => {
          deepmergeInto(draft, value);
        })
        return (newState);
    });
}