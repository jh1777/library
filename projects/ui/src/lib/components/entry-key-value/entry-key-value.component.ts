
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { UIBaseComponent, UiErrorComponent } from '../../shared';
import { EntryKeyValueStyle } from './entry-key-value.models';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'ui-entry-key-value',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiErrorComponent, FontAwesomeModule],
  templateUrl: './entry-key-value.component.html',
  styleUrl: './entry-key-value.component.scss'
})
export class EntryKeyValueComponent extends UIBaseComponent {

  infoIcon = signal(faInfoCircle);
  successIcon = signal(faCircleCheck);
  warningIcon = signal(faTriangleExclamation);
  errorIcon = signal(faCircleExclamation);

  /** Label for the header item - shown left */
  label = input.required<string>();

  /** Value for the header item - shown right */
  value = input.required<string>();

  /** 
   * Style `EntryKeyValueState` of the Key Value Item 
   * Optional; By default or if unset = `None`
   * The item will get colorized in:
   * - `None` = black (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * - `Dimmed` = grey
   * See {@link EntryKeyValueStyle}
   * 
  */
  style = input<EntryKeyValueStyle>(EntryKeyValueStyle.None);

  /**
   * Makes the Key and Value of bigger font size, the icon as well if present
   */
  isBig = input<boolean>(false);

  /**
   * Controls whether to show a style based icon
   */
  showIcon = input<boolean>(false);
}
