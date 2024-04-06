/**
 * Generic State that is used in tiles and items
 */
export enum EntryState {
    none = 0,
    attention = 1,
    error = 2,
    success = 3,
    automatic = 4 // only applies to while entry tile state, not working for title, items
  }