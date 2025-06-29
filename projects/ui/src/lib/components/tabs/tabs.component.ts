import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  booleanAttribute,
  effect,
  input,
  model,
} from '@angular/core';
import { UIBaseComponent, UiCollapseButtonComponent } from '../../shared';
import { TabComponent } from './tab/tab.component';
import { BadgeComponent } from '../badge';
// ClarityIcons.addIcons(
//   angleIcon
// );

@Component({
  selector: 'ui-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiCollapseButtonComponent, BadgeComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  /**
   * Optional way to control the active tab of this bar.  
   * Index starts at 0 for the first ui-tab child and so on.  
   * (overides the ui-tab `active` boolean - so you can't use both!)  
  */
  activeIndex = model<number>(-1);
  
  /**
   * Show previous/next tab buttons
   */
  showPrevNextButtons = input(true, { transform: booleanAttribute });

  constructor() {
    super();
    effect(
      () => {
        if (this.activeIndex() > -1) {
          const tab = this.tabs.get(this.activeIndex());
          if (tab) {
            this.selectTab(tab);
          }
        }
      }
    );
  }

  private getActiveTabs(): TabComponent[] {
    return this.tabs.filter((tab) => tab.isActive() == true);
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

  /**
   * Selects a specific Tab
   * @param tab TabComponent
   */
  selectTab(tab: TabComponent) {
    if (!tab || tab.isDisabled() == true) {
      return;
    }

    const tabs = this.tabs.toArray();
    tabs.forEach((t) => t.isActive.set(false));
    tab.isActive.set(true);

    if (this.activeIndex() > -1) {
      const idx = tabs.findIndex((t) => t === tab);
      if (idx > -1 && this.activeIndex() != idx) {
        this.activeIndex.set(idx);
      }
    }
  }

  /**
   * Set a next/previous Tab as active
   * @param direction Direction indicator (1: next, -1: previous)
   */
  activateTab(direction: number) {

    const handleIndex = (index: number): TabComponent => {
      let newIdx = index + direction;
      if (newIdx < 0) { newIdx = 0; }
      if (newIdx == this.tabs.length) { newIdx = this.tabs.length - 1; }

      let tab = this.tabs.get(newIdx);
      if (tab?.isDisabled() == true) {
        tab = handleIndex(newIdx);
      }
      return tab!;
    }

    const idx = this.getActiveTabIndex();

    if (idx != null) {
      const nextTab = handleIndex(idx);
      this.selectTab(nextTab);
    }
  }
}
