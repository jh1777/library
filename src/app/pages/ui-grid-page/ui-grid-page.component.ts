import { Component } from '@angular/core';
import { EntryTileComponent, GridComponent, EntryKeyValueComponent, 
  EntryMetricComponent, EntryItemComponent, EntryContainerComponent, 
  ButtonComponent, SwitchComponent, MetricTileComponent, CardComponent
} from 'projects/ui/src/public-api';

@Component({
  selector: 'app-ui-grid-page',
  standalone: true,
  imports: [GridComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, ButtonComponent, SwitchComponent, MetricTileComponent, EntryMetricComponent, EntryItemComponent, EntryContainerComponent ],
  templateUrl: './ui-grid-page.component.html',
  styleUrl: './ui-grid-page.component.scss'
})
export class UiGridPageComponent {

}
