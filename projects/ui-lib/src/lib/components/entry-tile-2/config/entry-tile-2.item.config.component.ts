import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { EntryState } from "../entry-tile-2.component";

@Component({
    selector: 'uic-entry-tile-item',
    standalone: true,
    imports: [CommonModule],
    template: ''
  })
  export class EntryTile2ItemConfigComponent {

    @Input()
    title?: string;

    /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`) 
     * By default or if unset, it is none.
     * The item will get colorized in:
     * - `none` = grey (default), 
     * - `attention` = orange
     * - `error` = red
     * - `success` = green
    */
    @Input()
    state?: EntryState;
  
    /** Is the Item clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
    @Input()
    clickable?: boolean;
    
    /** Primary Value is shown on top (line 1) inside the item box */
    @Input()
    primaryValue: string;
    
    /** Secondary Value is shown on top (line 2) inside the item box in grey color */
    @Input()
    secondaryValue?: string;
    
    /** If yes, the item will show a state icon in addition to the background color */
    @Input()
    showStateIcon?: boolean;

    /** Optional: Tooltip message (simple) wich is displayed on mouse over as html title */
    @Input()
    tooltip?: string;
    
    /** Optional: Icon to show at the right inside the item (clarity design icon name)   
     * Only works if `showStateIcon == false`!   
     * Intended mostly for usage as a clickable item to show that this is a link   
     * Will be colorized grey by default. If the item has `clickable == true` its shown in default action color   
     * 
    */
    @Input()
    icon?: string;
  }