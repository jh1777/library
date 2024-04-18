import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  effect,
  input,
  model,
} from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { TabComponent } from './tab/tab.component';
import { TabStyle } from './tabs.models';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon
} from "@cds/core/icon";
ClarityIcons.addIcons(
  angleIcon
);

@Component({
  selector: 'ui-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClarityModule],
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

  style = input<TabStyle>(TabStyle.Filled);
  
  showButtons = input<boolean>(true);

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

  private getActiveTabs(): TabComponent[] {
    return this.tabs.filter((tab) => tab.active);
  }

  private getActiveTabIndex(): number | null {
    const tab = this.getActiveTabs();
    if (tab && tab.length > 0) {
      const idx = this.tabs.toArray().findIndex((t) => t === tab[0]);
      if (idx > -1) {
        return idx;
      }
    }
    return null;
  }

  ngAfterContentInit() {
    const activeTabs = this.getActiveTabs();
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

  activateTab(direction: number) {
    const idx = this.getActiveTabIndex();
    if (idx != null) {
      let newIdx = idx + direction;
      if (newIdx < 0) { newIdx = 0; }
      if (newIdx == this.tabs.length) { newIdx = this.tabs.length - 1; }
      this.selectTab(this.tabs.get(newIdx));
    }
  }
}
