import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, 
  QueryList, computed, input, model, 
  signal} from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ModalSize } from './modal.models';
import { ToolbarComponent } from '../toolbar';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//ClarityIcons.addIcons(timesIcon);

@Component({
  selector: 'ui-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ToolbarComponent) toolbar!: QueryList<ToolbarComponent>;

  closeIcon = signal(faTimes);
  /**
   * Internally used for the modal height
   */
  calcHeight = computed(() => {
    switch (this.height()) {
      case ModalSize.XSmall:
        return 150
      case ModalSize.Small:
        return 200;
      case ModalSize.Medium:
        return 350;
      case ModalSize.Large:
        return 500;
      case ModalSize.XLarge:
        return 600;
      default:
        return 350;
    }
  });
  
  /**
   * Internally used for the modal width
   */
  calcWidth = computed(() => {
    switch (this.width()) {
      case ModalSize.XSmall:
        return 250;
      case ModalSize.Small:
        return 350;
      case ModalSize.Medium:
        return 450;
      case ModalSize.Large:
        return 550;
      case ModalSize.XLarge:
        return 650;
      default:
        return 450;
    }
  });

  ngAfterContentInit(): void {
    super.limitContentChildren(this.toolbar, 1);
    if (this.toolbar.length == 1) {
      this.toolbar.get(0)?.showToolbarText.set(false);
    }
  }

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
   * Modal `width` category 
   * Possible values are defined in `ModalSize` enum   
   * - XSmall - 0
   * - Small - 1
   * - Medium - 2 (default)
   * - Large - 3
   * - XLarge - 4   
   * See {@link ModalSize}
   */
  width = input<ModalSize>(ModalSize.Medium)

  /**
   * Modal `height` category 
   * Possible values are defined in `ModalSize` enum   
   * - XSmall - 0
   * - Small - 1
   * - Medium - 2 (default)
   * - Large - 3
   * - XLarge - 4   
   * See {@link ModalSize}
   */
  height = input<ModalSize>(ModalSize.Medium)

  /**
   * Controls whether a click on the dark backdrop should close the modal  
   * Default: `true`  
   */
  closeOnBackdropClick = input<boolean>(true);

  /**
   * Controls if a close (x) button should be shown  
   * This ONLY works if a `header` is set!  
   * Default: `true`  
   */
  showCloseButton = input<boolean>(true);

  /**
   * OnClick on the whole backdrop incl. modal  
   * Determines if backdrop was clicked and closes model if `closeOnBackdropClick`== `true`  
   * @param event MouseEvent  
   */
  onClickHandler(event: MouseEvent): void {
    /* TODO: Implement this - not working with strict

    if (this.closeOnBackdropClick() == true &&
      (event.target['className'] as string).includes("ui-modal-wrapper")) {
      this.isOpen.set(false);
    }
      */
  }

  /**
   * Close Button was clicked  
   * @param event MouseEvent
   */
  onCloseClick(event: MouseEvent): void {
    this.isOpen.set(false);
  }
}