import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { TagsComponentCS } from '@ui';
import { TagsViewData, TagsViewModel } from 'src/app/models/tags';
import { TagsCSViewData, TagsCSViewModel } from 'src/app/models/tags-cs';

@Component({
  selector: 'tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})
export class TagsPageComponent implements AfterViewInit {
  @Input()
  showComponentBorder: boolean = false;

  @ViewChildren(TagsComponentCS) viewChildren!: QueryList<TagsComponentCS>;

  public tagsCSData: Array<TagsCSViewModel> = [];
  public tagsData: Array<TagsViewModel> = [];

  constructor() {
    this.tagsCSData = TagsCSViewData;
    this.tagsData = TagsViewData;
  }
  
  ngAfterViewInit(): void {
    console.log(this.viewChildren);
  }

  addTag(model: TagsCSViewModel , isCS: boolean, i: number) {
    var random = Math.ceil(Math.random() * 100);
    this.viewChildren.get(i).tagsStore.addTag({
      name: `New-${random}`,
      value: `Tag-${random}`,
      description: `${random}`
    });
  }

  setOutput(model: any, entry: any) {
    model.$output = JSON.stringify(model)
    setTimeout(() => { model.$output = '' }, 3000);
  }
}
