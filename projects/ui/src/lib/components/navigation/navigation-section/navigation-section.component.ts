import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ContentChildren, input, output, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { NavigationSectionItemComponent } from './navigation-section-item/navigation-section-item.component';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  trashIcon,
  plusIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { ButtonComponent } from '../../button';

interface NavigationSectionItemExchange {
  label: string;
  isActive: boolean;
  index: number;
  showDelete: boolean;
}

@Component({
  selector: 'ui-navigation-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClarityModule, ButtonComponent],
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss'
})
export class NavigationSectionComponent extends UIBaseComponent implements AfterViewInit {
  @ContentChildren(NavigationSectionItemComponent) items: QueryList<NavigationSectionItemComponent>;

  s
  constructor() {
    super()
    ClarityIcons.addIcons(trashIcon, plusIcon);
  }

  sectionItems = computed(()=> {
    let result: Array<NavigationSectionItemExchange> = [];
    var i = 0;
    this.items.toArray().forEach(item => {
      result.push({
        isActive: item.isActive(),
        label: item.label(),
        index: i,
        showDelete: false
      });
      i++;
    });
    return result;
  });

  ngAfterViewInit(): void {
    
  }

  itemClicked($event: MouseEvent, item: NavigationSectionItemExchange): void {
    this.items.get(item.index).onItemClick.emit($event);
  }

  itemRemoveClicked($event: MouseEvent, item: NavigationSectionItemExchange): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.items.get(item.index).onDeleteItemClick.emit($event);
  }
  
  addItemClicked($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.onAddItemClick.emit($event);
  }

  label = input.required<string>();

  addItemButtonLabel = input<string>();

  onAddItemClick = output<MouseEvent>();
}
