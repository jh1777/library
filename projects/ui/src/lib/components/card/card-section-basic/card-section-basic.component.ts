import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared/ui-base.component';
import { ButtonComponent } from '../../button';
import { SwitchComponent } from '../../switch';

@Component({
  selector: 'ui-card-section-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './card-section-basic.component.html',
  styleUrl: './card-section-basic.component.scss'
})
export class CardSectionBasicComponent extends UIBaseComponent {
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 2);
  }
  
  isLast = signal<boolean>(false);

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** Set isLoading property which hides content and shows pulsing placeholders */
  isLoading = input<boolean>(false);
    
}
