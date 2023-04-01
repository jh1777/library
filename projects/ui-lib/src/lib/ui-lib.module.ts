import { NgModule } from '@angular/core';
import { UiLibComponent } from './ui-lib.component';
import { CommonModule } from '@angular/common';
import { ButtonComponentCS } from './components/button-cs';
import { ClarityModule } from '@clr/angular';
import { ButtonComponent } from './components/button';


@NgModule({
  declarations: [
    UiLibComponent,
    ButtonComponentCS,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    UiLibComponent,
    ButtonComponentCS,
    ButtonComponent
  ]
})
export class UiLibModule { }
