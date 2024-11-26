import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate{

  private authenticated: boolean;

  constructor(
    private router : Router){ 
    this.authenticated = false;
  }

  setTrue(){
    this.authenticated = true;
    console.log("AuthGuard changed to: " + this.authenticated);
  }

  setFalse(){
    this.authenticated = false;
    console.log("AuthGuard changed to: " + this.authenticated);
  }


  public getState(){
    /* console.log("AuthGuard State: " + this.authenticated); */
    return this.authenticated;
  }

  // AuthGuard
  canActivate(route: ActivatedRouteSnapshot): boolean {
    switch(this.authenticated){
      case true:
        return true;
      case false:
        this.router.navigate(["/home"]);
        return false;
    }
  }
}
