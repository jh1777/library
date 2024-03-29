import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { EntryState } from "../entry-tile-2.component";


@Component({
    selector: 'uic-entry-tile-title',
    standalone: true,
    imports: [CommonModule],
    template: ''
  })
  export class EntryTile2TitleConfigComponent {

    /** Label for the header item - shown left */
    label = input.required<string>();

    /** Value for the header item - shown right */
    value = input.required<string>();

    /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`) 
     * By default or if unset, it is none.
     * The item will get colorized in:
     * - `none` = grey (default), 
     * - `attention` = orange
     * - `error` = red
     * - `success` = green
    */
    state = input<EntryState>(EntryState.none);
  }