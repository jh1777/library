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

    state = input<EntryState>(EntryState.none);
  }