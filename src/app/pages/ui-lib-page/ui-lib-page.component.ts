
import { CommonModule } from "@angular/common";
import { Component, Input, signal } from "@angular/core";
import { BadgeComponent, ButtonComponent, 
  CardComponent, EntryTileComponent, 
  EntryKeyValueComponent, EntryItemComponent, SwitchComponent,
  EntryContainerComponent, EntryMetricComponent,
  ToolbarComponent, ValueTileComponent, EntryTileGridComponent, MetricTileComponent
 } from "projects/ui/src/public-api";

@Component({
    selector: 'ui-lib-page',
    standalone: true,
    imports: [CommonModule, BadgeComponent, SwitchComponent, EntryTileGridComponent, ValueTileComponent, MetricTileComponent, ToolbarComponent, ButtonComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, EntryItemComponent, EntryContainerComponent, EntryMetricComponent],
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent   {

    toggleState = signal<boolean>(false);


    log($event: any) {
      console.log("(UiLibPageComponent) Event Logging", $event);
    }
  }