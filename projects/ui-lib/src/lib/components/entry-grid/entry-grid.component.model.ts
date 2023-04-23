import { IEntryComponent } from "../../models/shared/item-component.interface";

export class EntryGridModel {
    items?: Array<IEntryComponent> = [];
    constructor(init?: Partial<EntryGridModel>) {
        Object.assign(this, init);
    }
}