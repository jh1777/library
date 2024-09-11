import { Component, input } from '@angular/core';
import { SpinnerSize } from './ui-spinner.models';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [],
  templateUrl: './ui-spinner.component.html',
  styleUrl: './ui-spinner.component.scss'
})
export class UiSpinnerComponent {

  /**
   * Text message to show right next to the spinner  
   * (Optional)  
   */
  text = input<string>();

  /**
   * Size of the spinner  
   * - `Small` = 0
   * - `Medium` = 1 (default)  
   * - `Large` = 2  
   * See {@link SpinnerSize}
   */
  size = input<SpinnerSize>(SpinnerSize.Medium);

}
