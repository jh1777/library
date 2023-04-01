import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './tags.component.iio.interface';
import { Tag } from './tags.component.interface';
import { TagsStore } from './tags.component.store';

@Component({
  selector: 'csgp-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [TagsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeButton', [
      state('false', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ width: '25px' })),
      transition('false => true',  animate('70ms')),
      transition('true => false', animate('70ms'))
    ])
  ]
})
export class TagsComponent {

  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.tagsStore);
      this.tagsStore.enableClick$.subscribe(this._enableClick);
      this.tagsStore.enableClickMore$.subscribe(this._enableClickMore);
    }
  }

  @Output()
  public onDeleteClick = new EventEmitter<Tag>();

  @Output()
  public onEditClick = new EventEmitter<Tag>();

  @Output()
  public onClick = new EventEmitter<Tag>();
  
  @Output()
  public onClickMore = new EventEmitter<void>();

  @Output()
  public onClickAdd = new EventEmitter<void>();

  private _enableClick = new BehaviorSubject(true);
  private _enableClickMore = new BehaviorSubject(false);

  constructor(
    public readonly tagsStore: TagsStore
  ) {
  }

  public tagClicked($event: any, $item: Tag) {
    if (this._enableClick.value) {
      $event.stopPropagation();
      this.onClick.emit($item);
    }
  }

  public tagAddClicked($event: any) {
      $event.stopPropagation();
      this.onClickAdd.emit();
  }

  public tagMoreClicked($event: any) {
    if (this._enableClickMore.value) {
      $event.stopPropagation();
      this.onClickMore.emit();
    }
  }

  public deleteTagClicked($event: any, $item: Tag) {
    $event.stopPropagation();
    this.tagsStore.deleteTagReducer($item);
    this.onDeleteClick.emit($item);
  }

  public editTagClicked($event: any, $item: Tag) {
    $event.stopPropagation();
    this.onEditClick.emit($item);
  }
}