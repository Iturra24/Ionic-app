import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShooterGamesPageRoutingModule } from './shooter-games-routing.module';

import { ShooterGamesPage } from './shooter-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShooterGamesPageRoutingModule
  ],
  declarations: [ShooterGamesPage]
})
export class ShooterGamesPageModule {}
