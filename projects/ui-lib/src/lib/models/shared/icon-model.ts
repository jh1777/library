export class IconModel {
    source?: 'fontawesome' | 'clarity' = 'clarity';
    iconName?: string;
    color?: string;
    size: number = 14;
    isClickable: boolean = true;
    tooltip?: string;

    constructor(init?: Partial<IconModel>) {
        Object.assign(this, init);
    }

}