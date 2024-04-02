import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { UIToolbarBaseComponent } from '../../base/toolbar-base.component';
import { ButtonV2Component } from '../button-v2/button-v2.component';

@Component({
  selector: 'ui-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    
    for (let i = 0; i < this.left.length; i++) {
      if (this.left.get(i).alignment() == 2) {
        this.left.get(i).hidden.set(true);
      }
    }
    for (let i = 0; i < this.right.length; i++) {
      if (this.right.get(i).alignment() == 1) {
        this.right.get(i).hidden.set(true);
      }
    }
    
  }
  @ContentChildren(ButtonV2Component) left: QueryList<ButtonV2Component>;
  @ContentChildren(ButtonV2Component) right: QueryList<ButtonV2Component>;


}
