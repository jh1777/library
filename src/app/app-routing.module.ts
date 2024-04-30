import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiLibPageComponent } from './pages/ui-lib-page/ui-lib-page.component';
import { UiGridPageComponent } from './pages/ui-grid-page/ui-grid-page.component';

const routes: Routes = [
  { path: '', component: UiLibPageComponent },
  { path: 'grid', component: UiGridPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
