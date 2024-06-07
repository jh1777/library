import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export interface MetricTileInterface extends UIBaseComponentInterface {
    header: string;
    description?: string;
}