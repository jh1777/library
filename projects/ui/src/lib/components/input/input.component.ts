import { Component,  model } from '@angular/core';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends UIBaseComponent {

  
  value = model<string>();

  onContentChange(event: any) {
    const text = event.target.innerText;
    if (this.value() != text) {
      this.value.set(text);
    }
  }
}