import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShooterGamesPage } from './shooter-games.page';

const routes: Routes = [
  {
    path: '',
    component: ShooterGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShooterGamesPageRoutingModule {}
