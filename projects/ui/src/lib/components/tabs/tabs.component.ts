import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  effect,
  model,
} from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
// TODO: add goto-next/goto-prev tab buttons on the right of the tabbar

  /**
   * Optional way to control the active tab of this bar.  
   * Index starts at 0 for the first ui-tab child and so on.  
   * (overides the ui-tab `active` boolean - so you can't use both!)  
  */
  activeIndex = model<number>(-1);

  constructor() {
    super();
    effect(
      () => {
        if (this.activeIndex() > -1) {
          const tab = this.tabs.get(this.activeIndex());
          this.selectTab(tab);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    const tabs = this.tabs.toArray();
    tabs.forEach((t) => t.active.set(false));
    tab.active.set(true);

    if (this.activeIndex() > -1) {
      const idx = tabs.findIndex((t) => t === tab);
      if (idx > -1 && this.activeIndex() != idx) {
        this.activeIndex.set(idx);
      }
    }
  }
}
