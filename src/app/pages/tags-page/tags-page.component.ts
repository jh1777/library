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

  setIIO($event: TagsCS.IIO, data: TagsCSViewModel) {
    $event.setId(data.id);
    $event.setLoading(data.isLoading);
    data?.tags?.forEach(tag => {
      $event.addTag(tag);
    });
  }

  setOutput(model: any) {
    model.$output = `id=${model}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }
}
