import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiToggleSyncService {
  private readonly channelState = new Map<string, WritableSignal<boolean>>();

  isOpen(key: string): boolean {
    return this.getChannel(key)();
  }

  setOpen(key: string, value: boolean): void {
    this.getChannel(key).set(value);
  }

  toggle(key: string): boolean {
    const channel = this.getChannel(key);
    channel.set(!channel());
    return channel();
  }

  private getChannel(key: string): WritableSignal<boolean> {
    const normalizedKey = key.trim();
    const existing = this.channelState.get(normalizedKey);

    if (existing != null) {
      return existing;
    }

    const created = signal<boolean>(false);
    this.channelState.set(normalizedKey, created);
    return created;
  }
}
