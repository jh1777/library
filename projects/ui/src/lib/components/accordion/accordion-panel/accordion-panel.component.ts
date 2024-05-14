import { AfterViewInit, ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-accordion-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './accordion-panel.component.html',
  styleUrl: './accordion-panel.component.scss'
})
export class AccordionPanelComponent extends UIBaseComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  
  }

  header = input<string>();


  isCollapsed = model<boolean>(true);

  public toggleCollapsed() {
    this.isCollapsed.set(!this.isCollapsed());

  }
}
