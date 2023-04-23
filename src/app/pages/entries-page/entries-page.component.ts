import { Component, Input } from '@angular/core';
import { MetricEntryViewData, MetricEntryViewModel } from 'src/app/models/metric-entry';
import { MetricEntryCSViewData, MetricEntryCSViewModel } from 'src/app/models/metric-entry-cs';
import { PropertyEntryViewData, PropertyEntryViewModel } from 'src/app/models/property-entry';

@Component({
  selector: 'entries-page',
  templateUrl: './entries-page.component.html',
  styleUrls: ['./entries-page.component.scss']
})
export class EntriesPageComponent {

  @Input()
  showComponentBorder: boolean = false;
  
  public propertyData: Array<PropertyEntryViewModel> = [];
  
  public metricData: Array<MetricEntryViewModel> = [];
  public metricDataCS: Array<MetricEntryCSViewModel> = [];

  constructor() {
    this.metricData = MetricEntryViewData;
    this.metricDataCS = MetricEntryCSViewData;
    this.propertyData = PropertyEntryViewData;
  }

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }
}