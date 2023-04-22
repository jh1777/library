import { Component, Input } from '@angular/core';
import { MetricEntryViewData, MetricEntryViewModel } from 'src/app/models/metric-entry';

@Component({
  selector: 'metrics-page',
  templateUrl: './metrics-page.component.html',
  styleUrls: ['./metrics-page.component.scss']
})
export class MetricsPageComponent {

  @Input()
  showComponentBorder: boolean = false;
  

  public metricData: Array<MetricEntryViewModel> = [];

  constructor() {
    this.metricData = MetricEntryViewData;
  }

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }
}