import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  { path: 'offre', component: AddOfferComponent },
  { path: 'offre/:id', component: AddOfferComponent },
  { path: '', component: MainComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddOfferComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
