import { PortalIconModel } from "../icon-model";

export class DrawerEntryModel {
    title: string = "";
    titleIcon: PortalIconModel;
    subtitle?: string;
    progressPercent: number = 0;
    progressColor?: string;
    showProgress: boolean = true;
    progressStatusLabel?: string;
    description?: string;
    isLoading?: boolean;
    ref?: any;

    constructor(init?: Partial<DrawerEntryModel>) {
        Object.assign(this, init);
    }
}