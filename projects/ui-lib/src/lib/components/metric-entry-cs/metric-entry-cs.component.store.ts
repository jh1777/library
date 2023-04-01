import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import produce from "immer";
import { Observable } from "rxjs";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { IIO } from "./metric-entry-cs.component.iio.interface";
import { MetricEntryState, MetricEntryValueState } from "./metric-entry-cs.component.interface";


@Injectable()
export class MetricEntryStore extends ComponentStore<MetricEntryState> implements IIO  {
    constructor() {
        super({ 
            isLoading: false, 
            errorData: null,
            label: {
                value: "Label"
            },
            value: {
                value: 0,
                percent: 0
            }
        });
    }

    setLoading = (state: boolean) => {
        this.setAllReducer({
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
            this.setAllReducer({
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
            label: {
                value: label,
                style: labelStyle
            },
            value: {
                value: value,
                percent: percent,
                color: valueColor
            },
            isLoading: false
        };
        this.setAllReducer(data);
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
            this.setIconReducer(config);

    };

    getValueData = (): Observable<MetricEntryValueState> => this.valueData$;

    // GETTERS
    //-------------
    readonly valueData$ = this.select(state => state.value);

    readonly isLoading$ = this.select(state => state.isLoading, { debounce: true });
    // Error 
    readonly hasError$ = this.select(state => state.errorData?.hasError, { debounce: true });
    readonly errorMessage$ = this.select(state => state.errorData?.message, { debounce: true });
    readonly errorShowLink$ = this.select(state => state.errorData?.showLink, { debounce: true });

    // Label
    readonly labelValue$ = this.select(state => state.label?.value, { debounce: true });
    readonly labelStyle$ = this.select(state => state.label?.style, { debounce: true });
    readonly labelIcon$ = this.select(state => state.label?.icon, { debounce: true });
    readonly labelIconClickable$ = this.select(state => state.label?.icon?.isClickable, { debounce: true });
    
    // Value
    readonly value$ = this.select(state => state.value?.value, { debounce: true });
    readonly valueColor$ = this.select(state => state.value?.color, { debounce: true });
    readonly valuePercent$ = this.select(state => state.value?.percent, { debounce: true });
    
    readonly showPctBar$ = this.select(state => !state.isLoading && (state.value?.percent != null && state.value?.percent != undefined), { debounce: true });

    // REDUCER
    private setIconReducer = this.updater((state: MetricEntryState, value: IconModel) => {
        const newState = produce(state, (draft: MetricEntryState) => {
            draft.label.icon = Object.assign(draft, value);
        });
        return newState;
    });

    private setAllReducer = this.updater((state: MetricEntryState, value: Partial<MetricEntryState>) => {
        const newState = produce(state, (draft: MetricEntryState) => {
            draft = Object.assign(draft, value);
        });
        return newState;
    });
}
