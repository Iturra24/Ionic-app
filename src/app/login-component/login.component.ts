import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DBService } from '../services/db.service';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  public loginForm : FormGroup;
  /* public dataService : DataService = new DataService; */


  constructor (
    private router : Router,
    private db : DBService,
    private authGuard : AuthGuardService,
    private dataService : DataService
  ) {

    this.loginForm = new FormGroup({
      mailInput : new FormControl,
      passwordInput : new FormControl
    })

  }

  async onSubmit(){
    if (this.loginForm.valid){

      let email = String(this.loginForm.get("mailInput")?.value);
      let password = String(this.loginForm.get("passwordInput")?.value);

      let user = await this.db.getUser(email, password);

      if (user){
        console.log(user);
        this.dataService.setData("user", user);
        this.authGuard.setTrue();
        this.clearInputs();
        this.router.navigate(['/profile']);
      }
      else{
        this.db.presentToast("Credenciales Incorrectas.")
        this.clearInputs();
      }
    }
  }

  public clearInputs(){
    this.loginForm.get("mailInput")?.setValue("");
    this.loginForm.get("passwordInput")?.setValue("");
  }

  async restoreData(){
    await this.dataService.removeData('userData');
  }

  goToRegister(){
    this.router.navigate(['/register-page']);
  }

}
