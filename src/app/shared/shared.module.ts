import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoggedNavbarComponent } from './logged-navbar/logged-navbar.component';



@NgModule({
  declarations: [
    FooterComponent,NavbarComponent, LoggedNavbarComponent
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports:[
    FooterComponent,NavbarComponent,LoggedNavbarComponent
  ]

})
export class SharedModule { }
