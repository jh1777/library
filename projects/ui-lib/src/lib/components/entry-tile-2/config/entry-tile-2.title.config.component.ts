import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";


@Component({
    selector: 'uic-entry-tile-title',
    standalone: true,
    imports: [CommonModule],
    template: ''
  })
  export class EntryTile2TitleConfigComponent {

    @Input()
    /** Label for the header item - shown left */
    label: string;

    /** Value for the header item - shown right */
    @Input()
    value: string;

    /** Optional: Clarity Icon shape name that is shown left to the value in the same color  
     * (default is black)   
     * */
    @Input()
    valueIcon?: string;
    /** Optional: Color of the value that is shown (e.g. "red")   
     * (default is black)
    */
    @Input()
    valueColor?: string;
  }