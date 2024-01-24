/**
 * Main class for Entry Tile
 */
export interface EntryTileState {
  /**  General purpose */
  id?: any;

  // states
  /** Indicates whether the content is still loading */
  isLoading: boolean;

  /** Represents the collapsed (=true) or expanded (=false) state of the tile.     
   * **Hint**: only applicable if the `collapseMode` is not `disabled`  
   * (default is false)
   * */
  isCollapsed?: boolean; 
  
  /** Controls if the tile can be collapsed  
   * There are 3 modes:
   * - `disabled` = no expand or collapse (default)
   * - `autoexpanded` = only attention and error items shown
   * - `manual` = all items shown by default, but collapse button shown
   */
  collapseMode: EntryTileCollapseMode;

  /**
   * Optional: State of the tile controls the color of the background  
   * The tile background will get colorized in:
   * - `none` = grey (default), 
   * - `attention` = orange
   * - `error` = red
   * - `success` = green  
   * See {@link EntryState}
   */
  state?: EntryState;

  /** Optional but recommended: Tile title 
  */
  title?: string;

  /** Optional: Tile title icon (not recommended to use) */
  titleIcon?: string;

  // Header
  /** Header items are shown on top inside the tile (before items are shown)  
   * This is a limited list of {@link EntryTileHeader} property pairs.
   */
  header: Array<EntryTileHeader>;

  /** The main content of the tile are the items.  
   * They are shown in boxes in a single column layout in the order they are in the array.   
   * As for `header` there is also a limit for the amount of items you can add.  
   * For definition of item model see {@link EntryTileItem}
   */
  items: Array<EntryTileItem>;

  /**
   * Optional: If you want to show a button a the bottom of the tile you can set the label of it here.  
   * If the label is not set, there will be no button shown.  
   * The button, if you specify a label, will trigger the `onShowMoreClick` output.
   */
  showMoreButtonLabel?: string;
}

/**
 * Entry Tile Item class
 * Is used for an item in the tile
 */
export interface EntryTileItem {
  /** Title of the Item - shown outside on top of the box */
  title?: string;

  /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`) 
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `none` = grey (default), 
   * - `attention` = orange
   * - `error` = red
   * - `success` = green
  */
  state?: EntryState;
  
  /** Is the Item clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
  clickable?: boolean;
  
  /** Primary Value is shown on top (line 1) inside the item box */
  primaryValue: string;
  
  /** Secondary Value is shown on top (line 2) inside the item box in grey color */
  secondaryValue?: string;
  
  /** If yes, the item will show a state icon in addition to the background color */
  showStateIcon?: boolean;

  /** Optional: Tooltip message (simple) wich is displayed on mouse over as html title */
  tooltip?: string;
  
  /** Optional: Icon to show at the right inside the item (clarity design icon name)   
   * Only works if `showStateIcon == false`!   
   * Intended mostly for usage as a clickable item to show that this is a link   
   * Will be colorized grey by default. If the item has `clickable == true` its shown in default action color   
   * 
  */
  icon?: string;
}

/**
 * Generic Label / Value pair class
 */
export interface EntryTileHeader {
  /** Label for the header item - shown left */
  label: string;

  /** Value for the header item - shown right */
  value: string;

  /** Optional: Clarity Icon shape name that is shown left to the value in the same color  
   * (default is black)   
   * */
  valueIcon?: string;
  /** Optional: Color of the value that is shown (e.g. "red")   
   * (default is black)
  */
  valueColor?: string;
}

/**
 * Generic State that is used in tiles and items
 */
export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3,
}

export enum EntryTileCollapseMode {
  /**  All items shown by default, no collapse button */
  disabled = 0,
  /** All items shown by default, but collapse button shown */
  manual = 1,
  /** Only attention and error items shown */
  autoexpanded = 2,
}
