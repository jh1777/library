import { Component, signal } from '@angular/core';
import { EntryTileComponent, GridComponent, EntryKeyValueComponent, 
  EntryMetricComponent, EntryTileItemComponent, EntryContainerComponent, CardStyle,
  AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent,
  ButtonComponent, SwitchComponent, MetricTileComponent, CardComponent, CardSectionBasicComponent
} from "../../../../projects/ui/src/public-api";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation, faTrash, faExternalLink } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-ui-grid-page',
  standalone: true,
  imports: [GridComponent, CardComponent, EntryTileComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent, CardSectionBasicComponent, EntryKeyValueComponent, ButtonComponent, SwitchComponent, MetricTileComponent, EntryMetricComponent, EntryTileItemComponent, EntryContainerComponent ],
  templateUrl: './ui-grid-page.component.html',
  styleUrl: './ui-grid-page.component.scss'
})
export class UiGridPageComponent {

  faCheck = signal<IconDefinition>(faCircleCheck);
  faError = signal<IconDefinition>(faCircleExclamation);
  faInfo = signal<IconDefinition>(faInfoCircle);
  faWarning = signal<IconDefinition>(faTriangleExclamation);
  faTrash = signal<IconDefinition>(faTrash);
  faExternalLink = signal<IconDefinition>(faExternalLink);
  

  cardStyle = signal<CardStyle>(CardStyle.None);


  setNextCardStyle() {
    if (this.cardStyle() < 3) {
      this.cardStyle.set(this.cardStyle() + 1);
    } else {
      this.cardStyle.set(0);
    }
  }

}
