import { IEntryComponent } from "projects/ui-lib/src/lib/models/shared/item-component.interface";
import { BaseViewModel } from "../base.view.model";

export interface EntryGridViewModel extends BaseViewModel {
    items: Array<IEntryComponent>;
}