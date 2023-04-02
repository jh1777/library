import { Component, Input } from '@angular/core';
import { TagsCS } from '@ui';
import { TagsViewData, TagsViewModel } from 'src/app/models/tags';
import { TagsCSViewData, TagsCSViewModel } from 'src/app/models/tags-cs';

@Component({
  selector: 'tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})
export class TagsPageComponent {
  @Input()
  showComponentBorder: boolean = false;

  public tagsCSData: Array<TagsCSViewModel> = [];
  public tagsData: Array<TagsViewModel> = [];

  constructor() {
    this.tagsCSData = TagsCSViewData;
    this.tagsData = TagsViewData;
  }

  addTag(model: TagsCSViewModel | TagsViewModel, isCS: boolean) {
    
    if (isCS) {
      const m = model as TagsCSViewModel;
      m.ref.addTag({
        name: "New",
        value: "Tag",
        description: ""
      });
    } else {
      const m = model as TagsViewModel;
      m.tags.push({
        name: "New",
        value: "Tag",
        description: ""
      });
    }
  }

  setIIO($event: TagsCS.IIO, data: TagsCSViewModel) {
    data.ref = $event;
    $event.setId(data.id);
    $event.setOverflow(data.overflowAfterXItems);
    $event.setVisibility(data.showAddButton, data.showEditButton, data.showDeletionButton, data.showTagsIcon);
    $event.setClickable(data.enableClick, data.enableClickMore, data.moreTagsLabel);
    $event.setLoading(data.isLoading);
    data?.tags?.forEach(tag => {
      $event.addTag(tag);
    });
  }

  setOutput(model: any, entry: any) {
    if (entry) {
      model.$output = `id=${entry.id}`;
    } else {
      model.$output = `id=${model.id}`;
    }
    setTimeout(() => { model.$output = '' }, 3000);
  }
}
