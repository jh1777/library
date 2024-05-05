import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent, 
  CardComponent, EntryTileComponent, TabComponent, TabsComponent, CardSectionBasicComponent,
  EntryKeyValueComponent, EntryItemComponent, SwitchComponent, MenuBarComponent,
  EntryContainerComponent, EntryMetricComponent, InputComponent, MenuItemComponent,
  ToolbarComponent, ValueTileComponent, GridComponent, MetricTileComponent, BadgeStyle
 } from "../../../../projects/ui/src/public-api";
import { ClarityModule } from '@clr/angular';

import {
  ClarityIcons,
  uploadCloudIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
ClarityIcons.addIcons(uploadCloudIcon);

@Component({
  selector: 'ui-example-page',
  imports: [ClarityModule, CardComponent, ToolbarComponent, CardSectionBasicComponent, EntryContainerComponent, EntryItemComponent, EntryKeyValueComponent, EntryMetricComponent, GridComponent, ButtonComponent, SwitchComponent, BadgeComponent, ValueTileComponent, EntryTileComponent],
  standalone: true,
  templateUrl: './ui-example-page.component.html',
  styleUrl: './ui-example-page.component.scss'
})
export class UiExamplePageComponent {

  badgeStyle = BadgeStyle;

}
