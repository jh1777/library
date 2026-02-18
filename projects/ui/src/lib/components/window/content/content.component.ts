import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { UIBaseComponent, UiSpinnerComponent } from '../../../shared';
import { BannerMessage } from './content.models';

@Component({
  selector: 'ui-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSpinnerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent extends UIBaseComponent {

  loadingText = input<string>('Loading');

  bannerMessage = signal<BannerMessage | null>(null);

  showMessage(message: BannerMessage) {
    this.bannerMessage.set(message);
    setTimeout(() => {
      this.bannerMessage.set(null);
    }, 3000); 
  }
}
