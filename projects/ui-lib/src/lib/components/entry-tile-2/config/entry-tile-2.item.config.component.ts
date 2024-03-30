import { CommonModule } from "@angular/common";
import { Component, ContentChild, ContentChildren, Query, QueryList, input } from "@angular/core";
import { EntryState } from "../models/entryState.model";
import { BadgeComponent } from "../../badge/badge.component";

@Component({
    selector: 'uic-entry-tile-item',
    standalone: true,
    imports: [CommonModule],
    template: '<div class="badge-component"><ng-content select="badge"></ng-content></div>',
    styleUrl: './entry-tile-2.item.config.component.scss'
  })
  export class EntryTile2ItemConfigComponent {

    @ContentChildren(BadgeComponent) badge: QueryList<BadgeComponent>;
    /**
     * Optional: Group Title to be shown at the top of the item itself
     */
    title = input<string>();

    /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`) 
     * By default or if unset, it is none.
     * The item will get colorized in:
     * - `none` = grey (default), 
     * - `attention` = orange
     * - `error` = red
     * - `success` = green
    */
    state = input<EntryState>(EntryState.none);
  
    /** Is the Item clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
    clickable = input<boolean>(false);
    
    /** Primary Value is shown on top (line 1) inside the item box */
    primaryValue = input.required<string>();
    
    /** Secondary Value is shown on top (line 2) inside the item box in grey color */
    secondaryValue = input<string>();
    
    /** If yes, the item will show a state icon in addition to the background color */
    showStateIcon = input<boolean>(false);

    /** Optional: Tooltip message (simple) wich is displayed on mouse over as html title */
    tooltip = input<string>();
    
    /** Optional: Icon to show at the right inside the item (clarity design icon name)   
     * Only works if `showStateIcon == false`!   
     * Intended mostly for usage as a clickable item to show that this is a link   
     * Will be colorized grey by default. If the item has `clickable == true` its shown in default action color   
     * 
    */
    icon = input<string>();
  }