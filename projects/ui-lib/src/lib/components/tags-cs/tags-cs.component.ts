import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
      transition('false => true', animate('70ms')),
      transition('true => false', animate('70ms'))
    ])
  ]
})
export class TagsComponentCS {

  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.tagsStore);
    }
  }

  @Input()
  public set isLoading(value: boolean) {
    this.tagsStore.setLoading(value);
  }

  @Input()
  public set tags(items: Array<Tag>) {
    this.tagsStore.setTags(items)
  }

  @Input() public set showTagsIcon(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      showTagsIcon: value
    })
  }

  @Input() public set showDeletionButton(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      showDeletionButton: value
    })
  }

  @Input() public set showEditButton(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      showEditButton: value
    })
  }

  @Input() public set showAddButton(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      showAddButton: value
    })
  }

  @Input() public set enableClick(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      enableClick: value
    })
  }

  @Input() public set enableClickMore(value: boolean) {
    this.tagsStore.mergeValueIntoState({
      enableClickMore: value
    })
  }

  @Input() public set overflowAfterXItems(value: number) {
    this.tagsStore.mergeValueIntoState({
      overflowAfterXItems: value
    })
  }

  @Input() public set moreTagsLabel(value: string) {
    this.tagsStore.mergeValueIntoState({
      moreTagsLabel: value
    })
  }

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


  private _enableClick = new BehaviorSubject(true);
  private _enableClickMore = new BehaviorSubject(false);

  constructor(public readonly tagsStore: TagsStore) {}

  ngOnInit(): void {
    this.tagsStore.enableClick$.subscribe({
      next: (value) => {
        this._enableClick.next(value);
      }
    });
    this.tagsStore.enableClickMore$.subscribe({
      next: (value) => {
        this._enableClickMore.next(value);
      }
    });
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