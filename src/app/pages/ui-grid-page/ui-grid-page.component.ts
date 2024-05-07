import { Component, signal } from '@angular/core';
import { EntryTileComponent, GridComponent, EntryKeyValueComponent, 
  EntryMetricComponent, EntryTileItemComponent, EntryContainerComponent, CardStyle,
  ButtonComponent, SwitchComponent, MetricTileComponent, CardComponent, CardSectionBasicComponent
} from "../../../../projects/ui/src/public-api";

@Component({
  selector: 'app-ui-grid-page',
  standalone: true,
  imports: [GridComponent, CardComponent, EntryTileComponent, CardSectionBasicComponent, EntryKeyValueComponent, ButtonComponent, SwitchComponent, MetricTileComponent, EntryMetricComponent, EntryTileItemComponent, EntryContainerComponent ],
  templateUrl: './ui-grid-page.component.html',
  styleUrl: './ui-grid-page.component.scss'
})
export class UiGridPageComponent {

  cardStyle = signal<CardStyle>(CardStyle.None);


  setNextCardStyle() {
    if (this.cardStyle() < 3) {
      this.cardStyle.set(this.cardStyle() + 1);
    } else {
      this.cardStyle.set(0);
    }
  }

}
