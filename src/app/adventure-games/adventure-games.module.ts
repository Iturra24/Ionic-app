import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdventureGamesPageRoutingModule } from './adventure-games-routing.module';

import { AdventureGamesPage } from './adventure-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdventureGamesPageRoutingModule
  ],
  declarations: [AdventureGamesPage]
})
export class AdventureGamesPageModule {}
