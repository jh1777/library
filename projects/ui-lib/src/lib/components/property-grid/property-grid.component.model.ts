import { IPropertyComponent } from "../../models/shared/item-component.interface";

export class PropertyGridModel {
    items?: Array<IPropertyComponent> = [];
    constructor(init?: Partial<PropertyGridModel>) {
        Object.assign(this, init);
    }
}