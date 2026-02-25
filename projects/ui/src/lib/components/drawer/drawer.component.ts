import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { UiToggleSyncService } from '../../shared/ui-toggle-sync.service';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'ui-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('drawerSlide', [
      transition(':enter', [
        query('.ui-drawer-panel', [
          style({ transform: 'translateX(100%)' }),
          animate('220ms ease-out', style({ transform: 'translateX(0)' })),
        ]),
      ]),
      transition(':leave', [
        query('.ui-drawer-panel', [
          animate('180ms ease-in', style({ transform: 'translateX(100%)' })),
        ]),
      ]),
    ]),
  ],
})
export class DrawerComponent extends UIBaseComponent implements AfterViewInit, OnDestroy {
  private readonly toggleSyncService = inject(UiToggleSyncService);

  private resizeObserver?: ResizeObserver;
  private readonly onWindowResize = () => this.updateMenuBarOffset();
  private observedMenuBarElement: HTMLElement | null = null;

  menuBarOffset = signal<number>(0);
  hasMenuBar = computed(() => this.menuBarOffset() > 0);
  drawerTopOffset = computed(() => `${this.menuBarOffset()}px`);
  drawerHeight = computed(() => `calc(100vh - ${this.menuBarOffset()}px)`);

  isOpen = model<boolean>(false);
  syncKey = input<string | null>(null);

  resolvedIsOpen = computed<boolean>(() => {
    const key = this.getNormalizedSyncKey();

    if (key == null) {
      return this.isOpen();
    }

    return this.toggleSyncService.isOpen(key);
  });

  header = input<string>();

  showBackdrop = input<boolean>(true);

  closeOnBackdropClick = input<boolean>(true);

  showCloseButton = input<boolean>(true);

  onClose = output<void>();
  onOpen = output<void>();

  constructor() {
    super();

    effect(() => {
      if (this.resolvedIsOpen() === true) {
        this.onOpen.emit();
        queueMicrotask(() => {
          this.updateMenuBarOffset();
          this.attachResizeObserver();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateMenuBarOffset();
    this.attachResizeObserver();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onWindowResize);
    }

    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.observedMenuBarElement = null;
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick() == true) {
      const key = this.getNormalizedSyncKey();

      if (key != null) {
        this.toggleSyncService.setOpen(key, false);
      }

      this.isOpen.set(false);
      this.onClose.emit();
    }
  }

  onCloseClick(): void {
    const key = this.getNormalizedSyncKey();

    if (key != null) {
      this.toggleSyncService.setOpen(key, false);
    }

    this.isOpen.set(false);
    this.onClose.emit();
  }

  private getNormalizedSyncKey(): string | null {
    const key = this.syncKey()?.trim();

    if (key == null || key.length === 0) {
      return null;
    }

    return key;
  }

  private updateMenuBarOffset(): void {
    if (typeof document === 'undefined') {
      this.menuBarOffset.set(0);
      return;
    }

    const menuBarElement = document.querySelector('ui-menu-bar') as HTMLElement | null;
    const topOffset = menuBarElement?.getBoundingClientRect().height ?? 0;

    this.menuBarOffset.set(Math.round(topOffset));
  }

  private attachResizeObserver(): void {
    if (typeof document === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }

    const menuBarElement = document.querySelector('ui-menu-bar') as HTMLElement | null;

    if (this.observedMenuBarElement === menuBarElement) {
      return;
    }

    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.observedMenuBarElement = menuBarElement;

    if (menuBarElement == null) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.updateMenuBarOffset());
    this.resizeObserver.observe(menuBarElement);
  }
}
