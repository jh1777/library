import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent, UiSpinnerComponent } from '../../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-window',
  standalone: true,
  imports: [CommonModule, UiSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent extends UIBaseComponent {

  loadingText = input<string>('Loading');

}
