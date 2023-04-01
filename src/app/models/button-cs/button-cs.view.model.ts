import { BaseViewModel } from "../base.view.model";

export interface ButtonCSViewModel extends BaseViewModel{
    id?: string;
    label?: string;
    loading: boolean;
    icon?: string;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    filled?: boolean;
}