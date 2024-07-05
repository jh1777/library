import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ContentChildren, input, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { NavigationSectionItemComponent } from './navigation-section-item/navigation-section-item.component';

interface NavigationSectionItemExchange {
  label: string;
  isActive: boolean;
  index: number;
}

@Component({
  selector: 'ui-navigation-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss'
})
export class NavigationSectionComponent extends UIBaseComponent implements AfterViewInit {
  @ContentChildren(NavigationSectionItemComponent) items: QueryList<NavigationSectionItemComponent>;

  sectionItems = computed(()=> {
    let result: Array<NavigationSectionItemExchange> = [];
    var i = 0;
    this.items.toArray().forEach(item => {
      result.push({
        isActive: item.isActive(),
        label: item.label(),
        index: i
      });
      i++;
    });
    return result;
  });

  ngAfterViewInit(): void {
    
  }

  itemClicked(item: NavigationSectionItemExchange): void {
    this.items.get(item.index).itemClicked.emit();
  }

  label = input.required<string>();
}
