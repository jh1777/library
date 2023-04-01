import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModel } from './button.component.model';

@Component({
  selector: 'csgp-button-v2',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent  {
  @Input()
  data: ButtonModel = new ButtonModel();

  @Output()
  onClick = new EventEmitter();

  @Output()
  onMouseEnter = new EventEmitter();

  @Output()
  onMouseLeave = new EventEmitter();
 
  public buttonClicked(event: Event) {
    if (!this.data?.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.onClick.emit();
    }
  }

  public mouseEnterEvent(event: Event) {
    if (!this.data?.disabled) {
      this.onMouseEnter.emit();
    }
  }

  public mouseLeaveEvent(event: Event) {
    if (!this.data?.disabled) {
      this.onMouseLeave.emit();
    }
  }
}