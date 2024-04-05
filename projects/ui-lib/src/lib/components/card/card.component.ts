import { AfterContentInit, AfterViewInit, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';
import { ButtonV2Component } from '../button-v2/button-v2.component';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent implements AfterContentInit {

  @ContentChildren(ButtonV2Component) buttons: QueryList<ButtonV2Component>;

  ngAfterContentInit(): void {
    for (let index = 0; index < this.buttons.length; index++) {
      const element = this.buttons.get(index);
      if (index > 1) {
        element.hidden.set(true);
      }
    }
  }

  title = input<string>();
  text = input<string>();
}
