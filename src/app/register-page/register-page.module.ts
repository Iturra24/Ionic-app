import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPagePageRoutingModule } from './register-page-routing.module';
import { RegisterPagePage } from './register-page.page';
import { RegisterComponentComponent } from '../register-component/register-component.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPagePage, RegisterComponentComponent]
})
export class RegisterPagePageModule {}
