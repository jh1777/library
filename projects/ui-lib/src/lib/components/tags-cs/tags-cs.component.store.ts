import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import produce from "immer";
import { Observable } from "rxjs";
import { IIO, Tag } from "./tags-cs.component.iio.interface";
import { TagsState } from "./tags-cs.component.interface";
const merge = require('deepmerge');

@Injectable()
export class TagsStore extends ComponentStore<TagsState> implements IIO  {
  constructor() {
    super({ 
      isLoading: false, 
      showTagsIcon: true,
      enableClick: true,
      enableClickMore: false,
      showDeletionButton: true,
      showEditButton: true,
      moreTagsLabel: '',
      overflowAfterXItems: 0,
      showAddButton: true,
      tags: []
    });
  }

  readonly tags$ = this.select(state => state.tags);
  readonly isLoading$ = this.select(state => state.isLoading);
  readonly showAddButton$ = this.select(state => state.showAddButton);
  readonly showTagsIcon$ = this.select(state => state.showTagsIcon);
  readonly enableClick$ = this.select(state => state.enableClick);
  readonly enableClickMore$ = this.select(state => state.enableClickMore);
  readonly showDeletionButton$ = this.select(state => state.showDeletionButton);
  readonly showEditButton$ = this.select(state => state.showEditButton);
  readonly moreTagsLabel$ = this.select(state => state.moreTagsLabel);
  readonly overflowAfterXItems$ = this.select(state => state.overflowAfterXItems);
  readonly id$ = this.select(state => state.id);

  setLoading = (state: boolean) => {
    this.setAllReducer({
      isLoading: state
    });
  };

  setClickable = (tag: boolean, more: boolean, moreLabel: string) => {
    this.setAllReducer({
      enableClick: tag,
      enableClickMore: more,
      moreTagsLabel: moreLabel
    });
  };


  setVisibility = (add: boolean, edit: boolean, del: boolean, tagsIcon: boolean) => {
    this.setAllReducer({
      showAddButton: add,
      showDeletionButton: del,
      showEditButton: edit,
      showTagsIcon: tagsIcon
    });
  }

  setId = (id: any) => {
    this.setAllReducer({
      id: id
    });
  }

  changeTag = (original: Tag, changed: Tag) => {
    this.editTagReducer({ oldTag: original, newTag: changed });
  }

  addTag = (tag: Tag) => {
    this.addTagReducer(tag);
  }

  setOverflow = (items: number) => {
    this.setAllReducer({
      overflowAfterXItems: items
    })
  }
  
  getTags = (): Observable<Array<Tag>> => this.tags$;

  readonly addTagReducer = this.updater((state, tag: Tag) => ({
    ...state,
    tags: state.tags.concat(tag)
  }));

  readonly deleteTagReducer = this.updater((state, tag: Tag) => ({
    ...state,
    tags: state.tags.filter(t => t != tag)
  }));

  readonly editTagReducer = this.updater((state, value: { oldTag: Tag, newTag: Tag }) => {
    const newstate = produce(state, draft => {
      draft.tags = draft.tags.map(item => (item === value.oldTag) ? value.newTag : item);
    });
    return newstate;
  });

  readonly tagsFiltered$ = this.select(state => state.overflowAfterXItems > 0 
      ? state.tags.slice(0, state.overflowAfterXItems)
      : state.tags
  );

  private setAllReducer = this.updater((state: TagsState, value: Partial<TagsState>) => {
    return merge(state, value);
});
}