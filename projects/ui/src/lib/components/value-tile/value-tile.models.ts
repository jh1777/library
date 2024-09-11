import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Value Tile Style that is used in tiles and items
 */
export enum ValueTileStyle {
    None = 0,
    Attention = 1,
    Error = 2,
    Success = 3
}

export interface ValueTileInterface extends UIBaseComponentInterface {
  key: string;
  value: string;
  style?: ValueTileStyle;
}