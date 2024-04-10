
import { Component, Input } from "@angular/core";
import { BadgeComponent, ButtonComponent, 
  CardComponent, EntryTileComponent, 
  EntryKeyValueComponent, EntryItemComponent,
  EntryContainerComponent, EntryMetricComponent,
  ToolbarComponent, ValueTileComponent, EntryTileGridComponent
 } from "projects/ui/src/public-api";

@Component({
    selector: 'ui-lib-page',
    standalone: true,
    imports: [BadgeComponent, EntryTileGridComponent, ValueTileComponent, ToolbarComponent, ButtonComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, EntryItemComponent, EntryContainerComponent, EntryMetricComponent],
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent   {

    @Input()
    showComponentBorder: boolean = false;
  }