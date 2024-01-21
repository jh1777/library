import { IconModel } from '../../models/shared/icon-model';

/**
 * Main class for Entry Tile
 */
export interface EntryTileState {
  // general purpose
  id?: any;

  // states
  isLoading: boolean; // done with Input but not in model
  isCollapsed: boolean; // really needed in model?
  state: EntryState;
  collapseMode: EntryTileCollapseMode;
  // Title
  title: string;
  titleIcon?: string; // Not recommended
  // Header
  header: Array<EntryTileProperty>;
  // Content
  items: Array<EntryTileItem>;
}

/**
 * Entry Tile Item class
 */
export interface EntryTileItem {
  title?: string;
  state?: EntryState;
  clickable?: boolean;
  primaryValue: string;
  secondaryValue?: string;
  icon?: IconModel;
}

/**
 * Generic Label / Value pair class
 */
export interface EntryTileProperty {
  label: string;
  value: string;
  valueIcon?: IconModel;
  valueStyle?: string;
}

export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3,
}

export enum EntryTileCollapseMode {
  // All items shown by default, no collapse button
  disabled = 0,
  /// All items shown by default, but collapse button shown
  manual = 1,
  /// Only attention and error items shown
  autoexpanded = 2,
}
