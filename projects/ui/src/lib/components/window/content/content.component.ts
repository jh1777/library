import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent, UiSpinnerComponent } from '../../../shared';

@Component({
  selector: 'ui-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSpinnerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent extends UIBaseComponent {

  loadingText = input<string>('Loading');

}
