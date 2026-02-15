import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ComponentNameStyle } from './component-name.models';

@Component({
  selector: 'ui-component-name',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.scss'
})
export class ComponentNameComponent extends UIBaseComponent {

  /**
   * Description of the input property
   * Default: value
   */
  propertyName = input<string>('default value');

  /**
   * Event emitted when something happens
   */
  onEvent = output<string>();

  // Add your component logic here

}
