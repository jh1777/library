import { UIBaseComponentInterface } from "../../shared/ui-base.models";


export interface ToolbarInterface extends UIBaseComponentInterface {
    text?: string;
    maxButtons?: number;
    maxBadges?: number;
    maxSwitches?: number;
    maxValueTiles?: number;
}