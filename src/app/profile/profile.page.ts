import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public items: any = {};

  constructor(
    private authGuard : AuthGuardService,
    private router : Router,
    private dataservice : DataService,
    private alertController : AlertController,
    private api: ApiServiceService
  ) { }

  ngOnInit() {
    console.log(this.dataservice.getData("user"));
    this.getStoredData();
  }

  logout(){ 
    this.authGuard.setFalse();
    this.dataservice.restoreData();
    this.router.navigate(["/home"]);
  }

  async getStoredData(){
    this.items = await this.dataservice.getData("user");
    console.log(this.items)
  }


  /* ALERTAS */

  /* Receta */
  async showRecepyAlert() {
    this.api.getRandomMeal().subscribe(
      async response => {
        let name = response.meals[0].strMeal;
        let category = response.meals[0].strCategory;
        let instructions = response.meals[0].strInstructions;

        const alert = await this.alertController.create({
          header: name,
          subHeader: category,
          message: instructions,
          buttons: ['OK'],
          cssClass: 'custom-alert'
        });
        alert.present();
      },
      async error => {
        const alert = await this.alertController.create({
          header: "Error",
          message: "Could not fetch the recipe. Please try again.",
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
  
  /* Usuario */
  async showUserAlert(){
    this.api.getRandomUser().subscribe(
      async response => {
        let name = response.name;
        let mail = response.email;
        let info = response.address.street + ", " + response.address.city + " ("+ response.address.zipcode +")";

        const alert = await this.alertController.create({
          header: name,
          subHeader: mail,
          message: info,
          buttons: ['OK'],
          cssClass: 'custom-alert'
        });
        alert.present();
      },
      async error => {
        const alert = await this.alertController.create({
          header: "Error",
          message: "Could not fetch the recipe. Please try again.",
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
  

}
