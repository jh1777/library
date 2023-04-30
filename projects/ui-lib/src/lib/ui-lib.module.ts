import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ButtonComponent } from './components/button';
import { ButtonComponentCS } from './components/button-cs';
import { DrawerEntryComponent } from './components/drawer-entry';
import { DrawerEntryComponentCS } from './components/drawer-entry-cs';
import { DrawerRightComponent } from './components/drawer-right';
import { DrawerRightComponentCS } from './components/drawer-right-cs';
import { EntryGridComponent } from './components/entry-grid';
import { GridTestComponent2 } from './components/grid-test-2/grid-test-2.component';
import { GridTestComponent } from './components/grid-test/grid-test.component';
import { MetricEntryComponent } from './components/metric-entry';
import { MetricEntryComponentCS } from './components/metric-entry-cs';
import { PropertyEntryComponent } from './components/property-entry';
import { PropertyEntryComponentCS } from './components/property-entry-cs';
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
    EntryGridComponent,
    // TAGS
    TagsComponent,
    TagsComponentCS,
    // DRAWER
    DrawerRightComponentCS,
    DrawerRightComponent,
    // DRAWER ENTRY
    DrawerEntryComponent,
    DrawerEntryComponentCS,

    GridTestComponent,
    GridTestComponent2
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
    EntryGridComponent,
    TagsComponent,
    TagsComponentCS,
    DrawerRightComponentCS,
    DrawerRightComponent,
    DrawerEntryComponentCS,
    DrawerEntryComponent,
    GridTestComponent,
    GridTestComponent2
  ]
})
export class UiLibModule { }
