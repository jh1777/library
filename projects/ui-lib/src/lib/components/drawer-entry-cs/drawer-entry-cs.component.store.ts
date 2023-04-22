import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { IIO } from "./drawer-entry-cs.component.iio.interface";
import { DrawerEntryState } from "./drawer-entry-cs.component.interface";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";

@Injectable()
export class DrawerEntryStore extends ComponentStore<DrawerEntryState> implements IIO  {
    constructor() {
        super({ 
            isLoading: false,
            errorData: null,
            showProgress: false,
            title: "Title"
        });
    }

    // GETTER
    //-------------
    readonly isLoading$ = this.select(state => state.isLoading, { debounce: true });

    // Error 
    readonly hasError$ = this.select(state => state.errorData?.hasError, { debounce: true });
    readonly errorMessage$ = this.select(state => state.errorData?.message, { debounce: true });
    readonly errorShowLink$ = this.select(state => state.errorData?.showLink, { debounce: true });

    // MODEL
    readonly showProgress$ = this.select(state => state.showProgress, { debounce: true });
    readonly description$ = this.select(state => state.description, { debounce: true });
    readonly title$ = this.select(state => state.title, { debounce: true });
    readonly subtitle$ = this.select(state => state.subtitle, { debounce: true });
    readonly titleIcon$ = this.select(state => state.titleIcon, { debounce: true });
    readonly progressColor$ = this.select(state => state.progressColor, { debounce: true });
    readonly progressPercent$ = this.select(state => state.progressPercent, { debounce: true });
    readonly progressStatusLabel$ = this.select(state => state.progressStatusLabel, { debounce: true });
    readonly isIconClickable$ = this.select(state => state.titleIcon?.isClickable, { debounce: true });
    readonly id$ = this.select(state => state.id);

    setId = (id: any) => {
      this.mergeValueIntoState({
        id: id
      });
    }
    // IIO
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

    setData = (title: string, subtitle: string, description: string) => {
        const data: Partial<DrawerEntryState> = {
            description: description,
            subtitle: subtitle,
            title: title,
            isLoading: false
        };
        this.mergeValueIntoState(data);
    };

    setProgress = (showProgress: boolean, percent: number, progressStatusLabel: string, progressColor?: string) => {
        const data: Partial<DrawerEntryState> = {
            progressPercent: percent,
            progressColor: progressColor,
            progressStatusLabel: progressStatusLabel,
            showProgress: showProgress
        };
        this.mergeValueIntoState(data);
    };

    setTitleIcon = (
        icon: string, 
        clickable: boolean = true, 
        color: string = null, 
        size: number = 16, 
        tooltip: string = null,
        source: "clarity" | "fontawesome" = "clarity") => {
            
        const config: IconModel = {
            iconName: icon,
            source: source,
            size: size,
            color: color,
            isClickable: clickable,
            tooltip: tooltip
        };
        //this.setIconsReducer(config);
        this.mergeValueIntoState({ titleIcon: config });
    };

    // REDUCER
    public mergeValueIntoState = this.updater((state: DrawerEntryState, value: Partial<DrawerEntryState>) => {
        const newState = produce(state, (draft) => {
          deepmergeInto(draft, value);
        })
        return (newState);
    });
}