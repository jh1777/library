import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IIO } from "./drawer-right-cs.component.iio.interface";
import { DrawerRightState } from "./drawer-right-cs.component.interface";

const merge = require('deepmerge');

@Injectable()
export class DrawerRightStore extends ComponentStore<DrawerRightState> implements IIO  {
    constructor() {
        super({ 
            show: false,
            title: "Title"
        });
    }


    // GETTER
    //-------------
    readonly title$ = this.select(state => state.title, { debounce: true });
    readonly show$ = this.select(state => state.show, { debounce: true });
    readonly description$ = this.select(state => state.description, { debounce: true });


    // SETTER
    setContent = (title: string, description?: string) => {
        this.setAllReducer({ title: title, description: description });
    };

    setShow = (show: boolean) => {
        this.setAllReducer({ show: show });
    };

    // REDUCER
    private setAllReducer = this.updater((state: DrawerRightState, value: Partial<DrawerRightState>) => {
        return merge(state, value);
    });

}