import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons, timesIcon, checkIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ToolbarComponent } from '../../toolbar';
import { ButtonComponent } from '../../button';
import { UIBaseComponent } from '../../../shared';
ClarityIcons.addIcons(timesIcon, checkIcon);

@Component({
  selector: 'ui-confirmation-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClarityModule, ModalComponent, ToolbarComponent, ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent extends UIBaseComponent {
  
  /**
   * Main bi-directional boolean to indicate if modal should be visible or not  
   * Input/Output  
   * Default = `false`
   */
  isOpen = model<boolean>(false);

  /**
   * Header text to show on top of the modal in larger bold font   
   * (optional)
   */
  header = input<string>();

  /**
   * Custom label for the confirmation button can be set  
   * The button is shown as `ui-button` in default styling; aligned left  
   * Default: 'Okay'  
   */
  confirmLabel = input<string>('Okay');

  /**
   * Custom label for the cancel button can be set  
   * The button is shown as `ui-button` in destructive styling; aligned right  
   * Default: 'Cancel'  
   */
  cancelLabel = input<string>('Cancel');

  /**
   * Message to show in the modal  
   * Uses `innerHTML`, so html formatting can be applied  
   * (optional)  
   */
  message = input<string>();

  /**
   * Event emitter for clicking the cancel button  
   * The `id()` will be emitted - if not set the `MouseEvent`  
   */
  onCancelClick = output<string | MouseEvent>();

  /**
   * Event emitter for clicking the confirmation button  
   * The `id()` will be emitted - if not set the `MouseEvent`  
   */
  onConfirmClick = output<string | MouseEvent>();

  /**
   * Confirmation button was clicked
   * @param event MouseEvent
   */
  onConfirmClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen.set(false);
    this.onConfirmClick.emit(this.id() ?? event);
  }

  /**
   * Cancel button was clicked
   * @param event MouseEvent
   */
  onCancelClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen.set(false);
    this.onCancelClick.emit(this.id() ?? event);
  }

}
