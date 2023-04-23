import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { IIO } from "./property-entry-cs.component.iio.interface";
import { PropertyEntryState } from "./property-entry-cs.component.interface";

@Injectable()
export class PropertyEntryStore extends ComponentStore<PropertyEntryState> implements IIO  {
    constructor() {
    super({ 
        isLoading: false,
        errorData: null,
        value: "Value",
        label: "Label",
        subtitle: "Subtitle",
        valueSubtitle: "Value Subtitle"
        });
    }

    // GETTERS
    //-------------
    readonly isLoading$ = this.select(state => state.isLoading, { debounce: true });
    readonly id$ = this.select(state => state.id, { debounce: true });

    // Error 
    readonly hasError$ = this.select(state => state?.errorData?.hasError, { debounce: true });
    readonly errorMessage$ = this.select(state => state?.errorData?.message, { debounce: true });
    readonly errorShowLink$ = this.select(state => state?.errorData?.showLink, { debounce: true });

    // Value
    readonly value$ = this.select(state => state?.value, { debounce: true });
    readonly valueStyle$ = this.select(state => state?.valueStyle, { debounce: true });
    readonly valueIcon$ = this.select(state => state?.valueIcon, { debounce: true });
    readonly valueIconClickable$ = this.select(state => state?.valueIcon?.isClickable, { debounce: true });

    // Value Subtitle
    readonly valueSubtitle$ = this.select(state => state?.valueSubtitle, { debounce: true });
    readonly valueSubtitleStyle$ = this.select(state => state?.valueSubtitleStyle, { debounce: true });
    readonly valueSubtitleIcon$ = this.select(state => state?.valueSubtitleIcon, { debounce: true });
    readonly valueSubtitleIconClickable$ = this.select(state => state?.valueSubtitleIcon?.isClickable, { debounce: true });
    
    // Label
    readonly label$ = this.select(state => state?.label, { debounce: true });
    readonly labelStyle$ = this.select(state => state?.labelStyle, { debounce: true });
    readonly labelIcon$ = this.select(state => state?.labelIcon, { debounce: true });
    readonly labelIconClickable$ = this.select(state => state?.labelIcon?.isClickable, { debounce: true });
    
    // Label Subtitle
    readonly subtitle$ = this.select(state => state?.subtitle, { debounce: true });
    readonly subtitleStyle$ = this.select(state => state.subtitleStyle, { debounce: true });
    readonly subtitleIcon$ = this.select(state => state.subtitleIcon, { debounce: true });
    readonly subtitleIconClickable$ = this.select(state => state.subtitleIcon?.isClickable, { debounce: true });
    
    readonly isIconClickable$ = this.select({
        label: this.labelIconClickable$,
        subtitle: this.subtitleIconClickable$,
        value: this.valueIconClickable$,
        valueSubtitle: this.valueSubtitleIconClickable$
    }, { debounce: true });

    // IIO
    setId = (value: any) => {
        this.mergeValueIntoState({ id: value });
    };

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

    setLabel = (
        value: string,
        icon?: IconModel,
        style?: string
    ) => {
        this.mergeValueIntoState({
            label: value,
            labelIcon: icon,
            labelStyle: style
        })
    };

    setSubtitle = (
        value: string,
        icon?: IconModel,
        style?: string
    ) => {
        this.mergeValueIntoState({
            subtitle: value,
            subtitleIcon: icon,
            subtitleStyle: style
        })
    };

    setValue = (
        value: string,
        icon?: IconModel,
        style?: string
    ) => {
        this.mergeValueIntoState({
            value: value,
            valueIcon: icon,
            valueStyle: style
        })
    };

    setValueSubtitle = (
        value: string,
        icon?: IconModel,
        style?: string
    ) => {
        this.mergeValueIntoState({
            valueSubtitle: value,
            valueSubtitleIcon: icon,
            valueSubtitleStyle: style
        })
    };

    // REDUCER
    public mergeValueIntoState = this.updater((state: PropertyEntryState, value: Partial<PropertyEntryState>) => {
        const newState = produce(state, (draft) => {
          deepmergeInto(draft, value);
        })
        return (newState);
    });
}