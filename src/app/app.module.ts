import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiLibModule } from 'projects/ui-lib/src/public-api';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { DrawerPageComponent } from './pages/drawer-page/drawer-page.component';
import { MetricsPageComponent } from './pages/metrics-page/metrics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonsPageComponent,
    TagsPageComponent,
    DrawerPageComponent,
    MetricsPageComponent
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