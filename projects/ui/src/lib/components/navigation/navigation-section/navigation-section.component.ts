import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { NavigationSectionItemComponent } from './navigation-section-item/navigation-section-item.component';
import { ButtonComponent } from '../../button';
import { faCirclePlus, faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';

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
  imports: [ButtonComponent, FontAwesomeModule],
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss'
})
export class NavigationSectionComponent extends UIBaseComponent {
  @ContentChildren(NavigationSectionItemComponent) items!: QueryList<NavigationSectionItemComponent>;

  plusIcon = signal(faCirclePlus);
  trashIcon = signal(faTrash);

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

  itemClicked($event: MouseEvent, item: NavigationSectionItemExchange): void {
    this.items.get(item.index)?.onItemClick.emit($event);
  }

  itemRemoveClicked($event: MouseEvent, item: NavigationSectionItemExchange): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.items.get(item.index)?.onDeleteItemClick.emit($event);
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
