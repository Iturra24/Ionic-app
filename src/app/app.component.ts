import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private router : Router,
    private authGuard : AuthGuardService
  ) {}

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

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  getAuth(){
    return this.authGuard.getState();
  }
}


