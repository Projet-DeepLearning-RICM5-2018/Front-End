import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MainComponent } from './main/main.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { NoPageComponent } from './no-page/no-page.component';
import { FooterComponent } from './footer/footer.component';
import { AdminStatsComponent } from './admin/admin-stats/admin-stats.component';
import { AdminDataComponent } from './admin/admin-data/admin-data.component';
import { AdminFieldComponent } from './admin/admin-field/admin-field.component';

const appRoutes: Routes = [
  { path: 'offre', component: AddOfferComponent },
  { path: 'offre/:id', component: AddOfferComponent },
  { path: 'mes-offres', component: MyOffersComponent },
  { path: 'admin', redirectTo: 'admin/statistiques', pathMatch: 'full' },
  { path: 'admin/statistiques', component: AdminStatsComponent },
  { path: 'admin/donnees', component: AdminDataComponent },
  { path: 'admin/formations', component: AdminFieldComponent },
  { path: '', component: MainComponent },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddOfferComponent,
    MyOffersComponent,
    MainComponent,
    NoPageComponent,
    FooterComponent,
    AdminStatsComponent,
    AdminDataComponent,
    AdminFieldComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
