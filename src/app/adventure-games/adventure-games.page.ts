import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-adventure-games',
  templateUrl: './adventure-games.page.html',
  styleUrls: ['./adventure-games.page.scss'],
})

export class AdventureGamesPage implements AfterViewInit {

  // Attributes
  public userData : any;
  private dataService : DataService = new DataService;
  

  // Constructor
  constructor(
    private router : Router,
    public menuCtrl : MenuController
  ) { }

  // Methods
  async ngAfterViewInit() {
    this.userData = await this.dataService.getData('userData');
  }

  openMenu(){
    this.menuCtrl.open('main-menu');
  }

  goToIndex(){
    this.router.navigate(['/index'])
  }

  goToLogin(){
    this.router.navigate(['/home'])
  }

  goToRegister(){
    this.router.navigate(['/register-page'])
  }

  goToShooters(){
    this.router.navigate(['/shooter-games'])
  }

  goToAdventures(){
    this.router.navigate(['/adventure-games'])
  }

}

