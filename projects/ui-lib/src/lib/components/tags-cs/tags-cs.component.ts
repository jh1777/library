import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO, Tag } from './tags-cs.component.iio.interface';
import { TagsStore } from './tags-cs.component.store';

@Component({
  selector: 'csgp-tags-cs',
  templateUrl: './tags-cs.component.html',
  styleUrls: ['./tags-cs.component.scss'],
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
export class TagsComponentCS {

  /*
  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.tagsStore);
      this.tagsStore.enableClick$.subscribe(this._enableClick);
      this.tagsStore.enableClickMore$.subscribe(this._enableClickMore);
    }
  }
  */

  @Output()
  public onDeleteClick = new EventEmitter<Tag>();

  @Output()
  public onEditClick = new EventEmitter<Tag>();

  @Output()
  public onClick = new EventEmitter<Tag>();
  
  @Output()
  public onMoreClick = new EventEmitter<void>();

  @Output()
  public onAddClick = new EventEmitter<void>();

  @Output()
  initialized = new EventEmitter<IIO>();

  private _enableClick = new BehaviorSubject(true);
  private _enableClickMore = new BehaviorSubject(false);

  constructor(
    public readonly tagsStore: TagsStore
  ) {
  }

  ngOnInit(): void {
    this.initialized.emit(this.tagsStore);
    this.tagsStore.enableClick$.subscribe(this._enableClick);
    this.tagsStore.enableClickMore$.subscribe(this._enableClickMore);
 
   }

  public tagClicked($event: any, $item: Tag) {
    if (this._enableClick.value) {
      $event.stopPropagation();
      this.onClick.emit($item);
    }
  }

  public tagAddClicked($event: any) {
      $event.stopPropagation();
      this.onAddClick.emit();
  }

  public tagMoreClicked($event: any) {
    if (this._enableClickMore.value) {
      $event.stopPropagation();
      this.onMoreClick.emit();
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