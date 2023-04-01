export class ComponentErrorModel {
    hasError?:  boolean;
    message?: string;
    showLink?: boolean;
    constructor(init?: Partial<ComponentErrorModel>) {
        Object.assign(this, init);
    }
}