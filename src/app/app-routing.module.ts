import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiLibPageComponent } from './pages/ui-lib-page/ui-lib-page.component';
import { UiGridPageComponent } from './pages/ui-grid-page/ui-grid-page.component';
import { ShowcasePageComponent } from './pages/showcase-page/showcase-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/showcase', pathMatch: 'full' },
  { path: 'grid', component: UiGridPageComponent },
  { path: 'showcase', component: ShowcasePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }