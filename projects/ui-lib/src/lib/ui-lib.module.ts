import { NgModule } from '@angular/core';
import { UiLibComponent } from './ui-lib.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button-cs/button.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    UiLibComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    UiLibComponent,
    ButtonComponent
  ]
})
export class UiLibModule { }
