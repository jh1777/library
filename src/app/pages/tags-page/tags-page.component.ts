import { Component, Input } from '@angular/core';
import { TagsCS } from '@ui';
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

  constructor() {
    this.tagsCSData = TagsCSViewData;
  }
  

  setIIO($event: TagsCS.IIO, data: TagsCSViewModel) {
   $event.setId(data.id);
   data?.tags?.forEach(tag => {
      $event.addTag(tag);
   });
  } 

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }
}
