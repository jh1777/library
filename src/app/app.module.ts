import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from '@clr/angular';
import { UiLibModule } from 'projects/ui-lib/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { DrawerPageComponent } from './pages/drawer-page/drawer-page.component';
import { EntriesPageComponent } from './pages/entries-page/entries-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonsPageComponent,
    TagsPageComponent,
    DrawerPageComponent,
    EntriesPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    UiLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }