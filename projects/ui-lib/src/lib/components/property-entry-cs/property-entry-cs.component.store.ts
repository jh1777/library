import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { IIO, Slot } from "./property-entry-cs.component.iio.interface";
import { PropertyEntryOptionsState, PropertyEntryState } from "./property-entry-cs.component.interface";
const merge = require('deepmerge');


@Injectable()
export class PropertyEntryStore extends ComponentStore<PropertyEntryState> implements IIO  {
    constructor() {
    super({ 
        isLoading: false,
        errorData: null,
        content: {
            value: "Content"
        },
        label: {
            value: "Label"
        },
        subtitleContent: {
            value: "Subtitle Content"
        },
        subtitleLabel: {
            value: "Subtitle Label"
        }
    });
    }

    // GETTERS
    //-------------
    readonly isLoading$ = this.select(state => state.isLoading, { debounce: true });

    // Error 
    readonly hasError$ = this.select(state => state.errorData?.hasError, { debounce: true });
    readonly errorMessage$ = this.select(state => state.errorData?.message, { debounce: true });
    readonly errorShowLink$ = this.select(state => state.errorData?.showLink, { debounce: true });

    // Content
    readonly contentValue$ = this.select(state => state.content?.value, { debounce: true });
    readonly contentStyle$ = this.select(state => state.content?.style, { debounce: true });
    readonly contentIcon$ = this.select(state => state.content?.icon, { debounce: true });
    readonly contentIconClickable$ = this.select(state => state.content?.icon?.isClickable, { debounce: true });

    // Content Subtitle
    readonly contentSubtitleValue$ = this.select(state => state.subtitleContent?.value, { debounce: true });
    readonly contentSubtitleStyle$ = this.select(state => state.subtitleContent?.style, { debounce: true });
    readonly contentSubtitleIcon$ = this.select(state => state.subtitleContent?.icon, { debounce: true });
    readonly contentSubtitleIconClickable$ = this.select(state => state.subtitleContent?.icon?.isClickable, { debounce: true });
    
    // Label
    readonly labelValue$ = this.select(state => state.label?.value, { debounce: true });
    readonly labelStyle$ = this.select(state => state.label?.style, { debounce: true });
    readonly labelIcon$ = this.select(state => state.label?.icon, { debounce: true });
    readonly labelIconClickable$ = this.select(state => state.label?.icon?.isClickable, { debounce: true });
    
    // Label Subtitle
    readonly labelSubtitleValue$ = this.select(state => state.subtitleLabel?.value, { debounce: true });
    readonly labelSubtitleStyle$ = this.select(state => state.subtitleLabel?.style, { debounce: true });
    readonly labelSubtitleIcon$ = this.select(state => state.subtitleLabel?.icon, { debounce: true });
    readonly labelSubtitleIconClickable$ = this.select(state => state.subtitleLabel?.icon?.isClickable, { debounce: true });
    
    readonly isIconClickable$ = this.select({
        label: this.labelIconClickable$,
        labelSubtitle: this.labelSubtitleIconClickable$,
        content: this.contentIconClickable$,
        contentSubtitle: this.contentSubtitleIconClickable$
    }, { debounce: true });

    // IIO
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

    setSlotIcon = (
        slot: Slot,
        icon: string, 
        clickable: boolean = true, 
        color: string = null, 
        size: number = 16, 
        tooltip: string = null,
        source: "clarity" | "fontawesome" = "clarity"
        ) => {
        const config: IconModel = {

                iconName: icon,
                source: source,
                size: size,
                color: color,
                isClickable: clickable,
                tooltip: tooltip

        };

        this.applyIconConfigForSlot(slot, config);
    }

    setSlotContent = (
        slot: Slot,
        value: string, 
        style: string = null
        ) => {
        const config: PropertyEntryOptionsState = {
            style: style,
            value: value
        };
        this.applyConfigForSlot(slot, config);
    }

    private applyConfigForSlot(
        slot: Slot,
        config: PropertyEntryOptionsState) {
        switch (slot) {
            case Slot.CONTENT:
                this.setAllReducer({
                    content: config
                });
                break;
            case Slot.LABEL:
                this.setAllReducer({
                    label: config
                });
                break;
            case Slot.CONTENT_SUBTITLE:
                this.setAllReducer({
                    subtitleContent: config
                });
                break;
            case Slot.LABEL_SUBTITLE:
                this.setAllReducer({
                    subtitleLabel: config
                });
                break;
            default:
                break;
        }
    }

    private applyIconConfigForSlot(
        slot: Slot,
        config: IconModel) {
        switch (slot) {
            case Slot.CONTENT:
                this.setAllReducer({
                    content: {
                        icon: config
                    }
                });
                break;
            case Slot.LABEL:
                this.setAllReducer({
                    label: {
                        icon: config
                    }
                });
                break;
            case Slot.CONTENT_SUBTITLE:
                this.setAllReducer({
                    subtitleContent: {
                        icon: config
                    }
                });
                break;
            case Slot.LABEL_SUBTITLE:
                this.setAllReducer({
                    subtitleLabel: {
                        icon: config
                    }
                });
                break;
            default:
                break;
        }
    }
    
    // REDUCER
    private setAllReducer = this.updater((state: PropertyEntryState, value: Partial<PropertyEntryState>) => {
        return merge(state, value);
    });
}