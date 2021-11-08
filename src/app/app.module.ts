import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgCircleProgressModule } from 'ng-circle-progress';
import { TimerComponent } from './components/timer/timer.component';
import { ButtonComponent } from './components/button/button.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ScoresComponent } from './components/scores/scores.component';
import { ContrastColorPipe } from './pipes/contrast-color.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ButtonComponent,
    ScoresComponent,
    ContrastColorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 500
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
