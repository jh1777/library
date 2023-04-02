import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ButtonComponent } from './components/button';
import { ButtonComponentCS } from './components/button-cs';
import { DrawerEntryComponentCS } from './components/drawer-entry-cs';
import { DrawerRightComponentCS } from './components/drawer-right-cs';
import { MetricEntryComponent } from './components/metric-entry';
import { MetricEntryComponentCS } from './components/metric-entry-cs';
import { PropertyEntryComponent } from './components/property-entry';
import { PropertyEntryComponentCS } from './components/property-entry-cs';
import { PropertyGridComponent } from './components/property-grid';
import { TagsComponent } from './components/tags';
import { TagsComponentCS } from './components/tags-cs';


@NgModule({
  declarations: [
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
    PropertyGridComponent,
    // TAGS
    TagsComponent,
    TagsComponentCS,
    // DRAWER
    DrawerRightComponentCS,
    // DRAWER ENTRY
    DrawerEntryComponentCS
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
    PropertyGridComponent,
    TagsComponent,
    TagsComponentCS,
    DrawerRightComponentCS,
    DrawerEntryComponentCS
  ]
})
export class UiLibModule { }
