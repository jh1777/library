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
import { EntryTileComponent } from './components/entry-tile/entry-tile.component';
import { GridTestComponent2 } from './components/grid-test-2/grid-test-2.component';
import { GridTestComponent } from './components/grid-test/grid-test.component';
import { MetricEntryComponent } from './components/metric-entry';
import { MetricEntryComponentCS } from './components/metric-entry-cs';
import { PropertyEntryComponent } from './components/property-entry';
import { PropertyEntryComponentCS } from './components/property-entry-cs';
import { TagsComponent } from './components/tags';
import { TagsComponentCS } from './components/tags-cs';
import {
  ClarityIcons,
  unknownStatusIcon, homeIcon, cogIcon, checkIcon, timesIcon, exclamationTriangleIcon, exclamationCircleIcon, checkCircleIcon, infoCircleIcon, infoStandardIcon, successStandardIcon, errorStandardIcon,
  warningStandardIcon, helpInfoIcon, barsIcon, userIcon, angleIcon, folderIcon, folderOpenIcon, bellIcon, imageIcon, cloudIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon,
  filterGridIcon, filterGridCircleIcon, searchIcon, viewColumnsIcon, angleDoubleIcon, calendarIcon, eventIcon, eyeIcon, stepForward2Icon,
  arrowIcon, calculatorIcon, piggyBankIcon, shoppingBagIcon, shoppingCartIcon, walletIcon, storeIcon, euroIcon, dollarIcon, pesoIcon, creditCardIcon, bankIcon, dollarBillIcon,
  eCheckIcon, poundIcon, cloudTrafficIcon, briefcaseIcon, boltIcon, truckIcon, uploadCloudIcon, nodeGroupIcon, cpuIcon, factoryIcon, cloudNetworkIcon, processOnVmIcon, bugIcon,
  shieldCheckIcon, curveChartIcon, detailsIcon, cloudScaleIcon, flagIcon, assignUserIcon, bookIcon, downloadCloudIcon, formIcon, disconnectIcon, networkSwitchIcon, controlLunIcon,
  filterIcon, logoutIcon, banIcon, switchIcon, circleIcon, sortByIcon, justifyTextIcon, syncIcon, linkIcon, clockIcon, helpIcon, copyIcon, codeIcon, compassIcon, tagsIcon, pencilIcon,
  plusIcon, windowCloseIcon, wrenchIcon, nvmeIcon, resistorIcon, vmIcon, trashIcon, downloadIcon, refreshIcon, envelopeIcon, newIcon,
  plusCircleIcon, keyIcon, connectIcon, popOutIcon, employeeIcon, shieldIcon, cursorHandGrabIcon, addTextIcon,
  dotCircleIcon, undoIcon, redoIcon, tagIcon, copyToClipboardIcon, historyIcon, recycleIcon, eraserIcon, exportIcon, administratorIcon

} from "@cds/core/icon";
import '@cds/core/icon/register.js';

ClarityIcons.addIcons(
  unknownStatusIcon, homeIcon, cogIcon, checkIcon, timesIcon, exclamationTriangleIcon, exclamationCircleIcon, checkCircleIcon, infoCircleIcon, infoStandardIcon, successStandardIcon, errorStandardIcon,
  warningStandardIcon, helpInfoIcon, barsIcon, userIcon, angleIcon, folderIcon, folderOpenIcon, bellIcon, imageIcon, cloudIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon,
  filterGridIcon, filterGridCircleIcon, searchIcon, viewColumnsIcon, angleDoubleIcon, calendarIcon, eventIcon, eyeIcon, stepForward2Icon,
  arrowIcon, calculatorIcon, piggyBankIcon, shoppingBagIcon, shoppingCartIcon, walletIcon, storeIcon, euroIcon, dollarIcon, pesoIcon, creditCardIcon, bankIcon, dollarBillIcon,
  eCheckIcon, poundIcon, cloudTrafficIcon, briefcaseIcon, boltIcon, truckIcon, uploadCloudIcon, nodeGroupIcon, cpuIcon, factoryIcon, cloudNetworkIcon, processOnVmIcon, bugIcon,
  shieldCheckIcon, curveChartIcon, detailsIcon, cloudScaleIcon, flagIcon, assignUserIcon, bookIcon, downloadCloudIcon, formIcon, disconnectIcon, networkSwitchIcon, controlLunIcon,
  filterIcon, logoutIcon, banIcon, switchIcon, circleIcon, sortByIcon, justifyTextIcon, syncIcon, linkIcon, clockIcon, helpIcon, copyIcon, codeIcon, compassIcon, tagsIcon, pencilIcon,
  plusIcon, windowCloseIcon, wrenchIcon, nvmeIcon, resistorIcon, vmIcon, trashIcon, downloadIcon, refreshIcon, envelopeIcon, newIcon,
  plusCircleIcon, keyIcon, connectIcon, popOutIcon, employeeIcon, shieldIcon, cursorHandGrabIcon, addTextIcon,
  dotCircleIcon, undoIcon, redoIcon, tagIcon, copyToClipboardIcon, historyIcon, recycleIcon, eraserIcon, exportIcon, administratorIcon


);


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
    GridTestComponent2,
    EntryTileComponent
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
    GridTestComponent2,
    EntryTileComponent,
  ]
})
export class UiLibModule { }
