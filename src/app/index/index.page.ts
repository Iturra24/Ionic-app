import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonItem } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})

export class IndexPage implements AfterViewInit{

  //Attributes
  @ViewChildren('card', { read: ElementRef }) cards!: QueryList<ElementRef>
  public dataService : DataService = new DataService;
  public userData : any;


  // Constructor
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    public menuCtrl : MenuController
  ) { }

  // METHODS
  async ngAfterViewInit() {
    this.animateCards();
    this.userData = await this.dataService.getData('userData');
    /* await console.log(this.userData); */
  }

  openMenu(){
    this.menuCtrl.open('main-menu');
  }

  // ANIMATION METHOD
  animateCards() {
    this.cards.forEach(card => {
      const cardAnimation = this.animationCtrl.create()
        .addElement(card.nativeElement)
        .duration(700)
        .iterations(1)
        .easing('ease-in-out')
        .fromTo('scale', '0%', '100%');
      
      cardAnimation.play();
    });
  }

  goToLogin(){
    this.router.navigate(['/home']);
  }
  
  goToRegister(){
    this.router.navigate(['/register-page']);
  }

  goToShooters(){
    this.router.navigate(['/shooter-games']);
  }

  goToAdventures(){
    this.router.navigate(['/adventure-games']);
  }

}
