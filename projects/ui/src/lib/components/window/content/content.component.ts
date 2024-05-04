import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent extends UIBaseComponent {

}
