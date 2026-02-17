import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UiLibPageComponent } from './pages/ui-lib-page/ui-lib-page.component';
import { ShowcasePageComponent } from './pages/showcase-page/showcase-page.component';
import { WindowComponent, MenuBarComponent, MenuItemComponent, ContentComponent } from '../../projects/ui/src/public-api';

@NgModule({
  declarations: [
    AppComponent
 ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiLibPageComponent,
    ShowcasePageComponent,
    MenuBarComponent,
    MenuItemComponent,
    WindowComponent,
    ContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }