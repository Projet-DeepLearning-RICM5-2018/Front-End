import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MainComponent } from './main/main.component';
import { NoPageComponent } from './no-page/no-page.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: 'offre', component: AddOfferComponent },
  { path: 'offre/:id', component: AddOfferComponent },
  { path: '', component: MainComponent },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddOfferComponent,
    MainComponent,
    NoPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
