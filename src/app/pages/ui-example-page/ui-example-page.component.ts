import { Component, signal } from '@angular/core';
import { BadgeComponent, ButtonComponent, 
  CardComponent, EntryTileComponent, TabComponent, TabsComponent, CardSectionBasicComponent,
  EntryKeyValueComponent, EntryTileItemComponent, SwitchComponent, MenuBarComponent, NavigationSectionComponent,
  NavigationSectionItemComponent, EntryContainerComponent, EntryMetricComponent, MenuItemComponent, NavigationComponent,
  ToolbarComponent, ValueTileComponent, GridComponent, MetricTileComponent, BadgeStyle
 } from "../../../../projects/ui/src/public-api";

import { faRefresh, faCloudArrowUp, faCopy, faExternalLink, IconDefinition, faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'ui-example-page',
  imports: [ CardComponent, ToolbarComponent, NavigationSectionItemComponent, NavigationComponent, NavigationSectionComponent, CardSectionBasicComponent, EntryContainerComponent, EntryTileItemComponent, EntryKeyValueComponent, EntryMetricComponent, GridComponent, ButtonComponent, SwitchComponent, BadgeComponent, ValueTileComponent, EntryTileComponent],
  standalone: true,
  templateUrl: './ui-example-page.component.html',
  styleUrl: './ui-example-page.component.scss'
})
export class UiExamplePageComponent {

  badgeStyle = BadgeStyle;
  faCheck = signal<IconDefinition>(faCircleCheck);
  faError = signal<IconDefinition>(faCircleExclamation);
  faInfo = signal<IconDefinition>(faInfoCircle);
  faWarning = signal<IconDefinition>(faTriangleExclamation);
  faTrash = signal<IconDefinition>(faTrash);
  faCloudUpload = signal<IconDefinition>(faCloudArrowUp);
  faCopy = signal<IconDefinition>(faCopy);
  faExternalLink = signal<IconDefinition>(faExternalLink);
  faRefresh = signal<IconDefinition>(faRefresh);


  liste = [ "Partner A", "Partner B - Which has a very long text in it because of testing the word breaks.", "Partner C"];

  log(message: string, object: any = null) {
    console.log(`LOG: ${message}`, object)
  }
}