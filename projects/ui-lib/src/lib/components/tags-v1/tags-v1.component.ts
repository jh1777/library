import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from './tagModel';


@Component({
  selector: 'app-tags-v1',
  templateUrl: './tags-v1.component.html',
  styleUrls: ['./tags-v1.component.scss'],
  animations: [
    trigger('fadeButton', [
      state('false', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ width: '25px' })),
      transition('false => true',  animate('70ms')),
      transition('true => false', animate('70ms'))
    ])
  ]
})
export class TagsV1Component  {

  @Input()
  public isLoading: boolean = false;
  
  private _tags: Array<Tag> = [];

  @Input()
  public set tags(items: Array<Tag>) {
    if (this.overflowAfterXItems > 0) {
      this._tags = items.slice(0, this.overflowAfterXItems);
    } else {
      this._tags = items;
    }
  }

  public get tags(): Array<Tag> {
    return this._tags;
  }

  @Input()
  public showTagsIcon: boolean = true;

  @Input()
  public enableDeletionButton: boolean = true;

  @Input()
  public enableEditButton: boolean = true;

  // Enables the click event and mouse pointer for all tag items
  @Input()
  public enableClick: boolean = true;

  // Enables the click event and mouse pointer for the more (...) button if present
  @Input()
  public enableClickMore: boolean = true;

  // If set != 0 only this amount of tags is shown
  @Input()
  public overflowAfterXItems: number = 0;

  @Input()
  public moreTagsLabel: string = "";

  // ----------------

  @Output()
  public onDeleteClick = new EventEmitter<Tag>();

  @Output()
  public onEditClick = new EventEmitter<Tag>();

  @Output()
  public onClick = new EventEmitter<Tag>();
  
  @Output()
  public onClickMore = new EventEmitter<void>();

  public tagClicked($event: any, $item: Tag) {
    if (this.enableClick) {
      $event.stopPropagation();
      this.onClick.emit($item);
    }
  }

  public tagMoreClicked($event: any) {
    if (this.enableClickMore) {
      $event.stopPropagation();
      this.onClickMore.emit();
    }
  }

  public deleteTagClicked($event: any, $item: Tag) {
    $event.stopPropagation();
    this.onDeleteClick.emit($item);
  }

  public editTagClicked($event: any, $item: Tag) {
    $event.stopPropagation();
    this.onEditClick.emit($item);
    
  }
}