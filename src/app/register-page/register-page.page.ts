import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage {

  constructor(
    private router : Router
  ) { }


  goToIndex(){
    this.router.navigate(["/index"]);
  }

}
