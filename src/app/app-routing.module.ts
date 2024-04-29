import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiLibPageComponent } from './pages/ui-lib-page/ui-lib-page.component';

const routes: Routes = [
  { path: '', component: UiLibPageComponent },
  { path: 'device', component: UiLibPageComponent },
  { path: 'vehicle', component: UiLibPageComponent },
  { path: 'tags', component: UiLibPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
