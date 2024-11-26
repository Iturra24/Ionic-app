import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnInit } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonItem } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DBService } from '../services/db.service';


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})

export class RegisterComponentComponent 
implements AfterViewInit, OnInit{
  
  // ATTRIBUTES
  public registerForm;
  // ViewChildren decorator to select all form items and buttons
  @ViewChildren('button', { read: ElementRef }) buttons!: QueryList<ElementRef>

  users: any = [];

  // CONSTRUCTOR
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private db : DBService
  ){
    
    // Inicializar formulario
    this.registerForm = new FormGroup({
      usernameInput : new FormControl,
      mailInput : new FormControl,
      passwordInput : new FormControl,
    });
  }
  
  ngOnInit(): void {
    this.db.dbState().subscribe(
      (res) =>{
        if (res){
          this.db.fetchUsers().subscribe(
            user => {
              this.users = user;
              console.log(this.users);
            })
        }
      })
  }

  // METHODS
  // Interface method
  ngAfterViewInit() {
    // console.log(this.buttons); // Log the elements to verify they are being captured
    this.animateButtons();
  }
  
  // Redirigir al login
  goToLogin(){
    this.router.navigate(['/home']);
  }

  // Register new user
  registerNewUser(){
    // Data
    let username = String(this.registerForm.get("usernameInput")?.value);
    let mail = String(this.registerForm.get("mailInput")?.value);
    let password = String(this.registerForm.get("passwordInput")?.value);

    console.log([username, mail, password]);
    
    // Insert
    this.db.addUser(
      username = username,
      mail = mail,
      password = password
    );

    this.db.presentToast("Nuevo usuario " + username + " registrado.");
    this.clearInputs();
    console.log(this.db.listUsers());
    
  }


  // Limpiar datos del fomrulario
  clearInputs(){
    this.registerForm.get("usernameInput")?.setValue("");
    this.registerForm.get("mailInput")?.setValue("");
    this.registerForm.get("passwordInput")?.setValue("");
  }

  // ANIMATION METHOD
  // Button background color animation in infinite loop
  animateButtons() {
    this.buttons.forEach(button => {
      const colorAnimation = this.animationCtrl.create()
        .addElement(button.nativeElement)
        .duration(5000)
        .iterations(Infinity)
        .easing('ease-in-out')
        .fromTo('color', 'black', 'white', )
        .fromTo('background', 'white', 'black', );
      
      colorAnimation.play();
    });
  }
}
