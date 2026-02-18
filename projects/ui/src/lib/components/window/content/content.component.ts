import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, DestroyRef, effect, inject, input, QueryList, signal } from '@angular/core';
import { UIBaseComponent, UiSpinnerComponent } from '../../../shared';
import { BannerMessage } from './content.models';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../button';

@Component({
  selector: 'ui-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSpinnerComponent, FontAwesomeModule, ButtonComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent extends UIBaseComponent {
  closeIcon = signal(faClose);
  loadingText = input<string>('Loading');

  bannerMessage = signal<BannerMessage | null>(null);

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  showMessage(message: BannerMessage) {
    this.clearTimer();
    this.bannerMessage.set(message);
    this.dismissTimer = setTimeout(() => {
      this.bannerMessage.set(null);
      this.dismissTimer = null;
    }, message.duration ?? 3000);
  }

  onActionClick() {
    const action = this.bannerMessage()?.action;
    this.dismissMessage();
    action?.();
  }

  dismissMessage() {
    this.clearTimer();
    this.bannerMessage.set(null);
  }

  actionButtonStyle(message: BannerMessage): number {
    switch (message.type) {
      case 'success':
        return 5;
      case 'error':
        return 4;
      case 'info':
        return 1;
      default:
        return 0;
    }
  }

  private clearTimer() {
    if (this.dismissTimer !== null) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
  }
}
