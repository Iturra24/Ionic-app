import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-shooter-games',
  templateUrl: './shooter-games.page.html',
  styleUrls: ['./shooter-games.page.scss'],
})

export class ShooterGamesPage implements AfterViewInit {

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
