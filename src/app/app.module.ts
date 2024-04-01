import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from '@clr/angular';
import { BadgeComponent, ButtonV2Component, EntryItemComponent, EntryKeyValueComponent, EntryTile2Component, EntryTile2ItemConfigComponent, EntryTile2TitleConfigComponent, EntryTile3Component, TestButtonComponent, UiLibModule } from 'projects/ui-lib/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { DrawerPageComponent } from './pages/drawer-page/drawer-page.component';
import { EntriesPageComponent } from './pages/entries-page/entries-page.component';
import { EntryGridPageComponent } from './pages/entry-grid-page/entry-grid-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { EntryTilePageComponent } from './pages/entry-tile-page/entry-tile-page/entry-tile-page.component';

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
    AppComponent,
    HeaderComponent,
    ButtonsPageComponent,
    TagsPageComponent,
    DrawerPageComponent,
    EntriesPageComponent,
    EntryGridPageComponent,
    EntryTilePageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    UiLibModule,
    EntryTile2Component,
    EntryTile2ItemConfigComponent,
    EntryTile2TitleConfigComponent,
    BadgeComponent,
    TestButtonComponent,
    EntryTile3Component,
    EntryKeyValueComponent,
    EntryItemComponent,
    ButtonV2Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }