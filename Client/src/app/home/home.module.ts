import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './home.component';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    RatingModule,
    RouterModule,
    FormsModule,
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
