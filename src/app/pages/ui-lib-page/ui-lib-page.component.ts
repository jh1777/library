
import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { BadgeComponent, ButtonComponent, 
  CardComponent, EntryTileComponent, TabComponent, TabsComponent, CardSectionBasicComponent,
  EntryKeyValueComponent, EntryItemComponent, SwitchComponent, MenuBarComponent,
  EntryContainerComponent, EntryMetricComponent, InputComponent, MenuItemComponent,
  ToolbarComponent, ValueTileComponent, GridComponent, MetricTileComponent
 } from "projects/ui/src/public-api";

@Component({
    selector: 'ui-lib-page',
    standalone: true,
    imports: [CommonModule, BadgeComponent, SwitchComponent, CardSectionBasicComponent, MenuItemComponent, MenuBarComponent, InputComponent, TabComponent, TabsComponent, GridComponent, ValueTileComponent, MetricTileComponent, ToolbarComponent, ButtonComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, EntryItemComponent, EntryContainerComponent, EntryMetricComponent],
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent   {

    toggleState = signal<boolean>(false);

    activeTabIndex = signal<number>(0);

    inputValue = signal<string>("Initial Value");

    log($event: any) {
      console.log("(UiLibPageComponent) Event Logging", $event);
    }
  }