import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ButtonComponent } from './components/button';
import { ButtonComponentCS } from './components/button-cs';
import { MetricEntryComponent } from './components/metric-entry';
import { MetricEntryComponentCS } from './components/metric-entry-cs';
import { PropertyEntryComponent } from './components/property-entry';
import { PropertyEntryComponentCS } from './components/property-entry-cs';
import { PropertyGridComponent } from './components/property-grid';
import { UiLibComponent } from './ui-lib.component';


@NgModule({
  declarations: [
    UiLibComponent,
    // BUTTON
    ButtonComponentCS,
    ButtonComponent,
    // METRIC ENTRY
    MetricEntryComponentCS,
    MetricEntryComponent,
    // PROPERTY ENTRY
    PropertyEntryComponent,
    PropertyEntryComponentCS,
    // PROPERTY GRID
    PropertyGridComponent
  ],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    ButtonComponentCS,
    ButtonComponent,
    MetricEntryComponentCS,
    MetricEntryComponent,
    PropertyEntryComponent,
    PropertyEntryComponentCS,
    PropertyGridComponent
  ]
})
export class UiLibModule { }
