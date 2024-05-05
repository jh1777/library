import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiLibPageComponent } from './pages/ui-lib-page/ui-lib-page.component';
import { UiGridPageComponent } from './pages/ui-grid-page/ui-grid-page.component';
import { UiExamplePageComponent } from './pages/ui-example-page/ui-example-page.component';

const routes: Routes = [
  { path: '', component: UiLibPageComponent },
  { path: 'grid', component: UiGridPageComponent },
  { path: 'example', component: UiExamplePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
