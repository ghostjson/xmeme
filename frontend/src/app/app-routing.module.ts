import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './views/edit/edit.component';
import { ExploreComponent } from './views/explore/explore.component';
import { ShareComponent } from './views/share/share.component';

const routes: Routes = [
  {
    path: 'share',
    component: ShareComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'explore/latest',
  },
  {
    path: 'explore',
    pathMatch: 'full',
    redirectTo: 'explore/latest',
  },
  {
    path: 'explore/:filter',
    component: ExploreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
