import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IIO } from "./drawer-right-cs.component.iio.interface";
import { DrawerRightState } from "./drawer-right-cs.component.interface";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";

@Injectable()
export class DrawerRightStore extends ComponentStore<DrawerRightState> implements IIO  {
    constructor() {
        super({ 
            show: false,
            title: "Title",
            sourceHtmlSelector: ""
        });
    }


    // GETTER
    //-------------
    readonly title$ = this.select(state => state.title, { debounce: true });
    readonly show$ = this.select(state => state.show, { debounce: true });
    readonly description$ = this.select(state => state.description, { debounce: true });
    readonly sourceHtmlSelector$ = this.select(state => state.sourceHtmlSelector, { debounce: true });


    // SETTER
    setContent = (title: string, description?: string) => {
        this.mergeValueIntoState({ title: title, description: description });
    };

    setShow = (show: boolean) => {
        this.mergeValueIntoState({ show: show });
    };

    // REDUCER
    public mergeValueIntoState = this.updater((state: DrawerRightState, value: Partial<DrawerRightState>) => {
        const newState = produce(state, (draft) => {
          deepmergeInto(draft, value);
        })
        return (newState);
    });

}