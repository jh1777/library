import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
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

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  showMessage(message: BannerMessage, duration = 3000) {
    this.clearTimer();
    this.bannerMessage.set(message);
    this.dismissTimer = setTimeout(() => {
      this.bannerMessage.set(null);
      this.dismissTimer = null;
    }, duration);
  }

  dismissMessage() {
    this.clearTimer();
    this.bannerMessage.set(null);
  }

  private clearTimer() {
    if (this.dismissTimer !== null) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
  }
}
