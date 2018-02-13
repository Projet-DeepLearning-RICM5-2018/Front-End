import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AddOfferComponent } from './user/add-offer/add-offer.component';
import { MainComponent } from './user/main/main.component';
import { MyOffersComponent } from './user/my-offers/my-offers.component';
import { NoPageComponent } from './layout/no-page/no-page.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminStatsComponent } from './admin/admin-stats/admin-stats.component';
import { AdminDataComponent } from './admin/admin-data/admin-data.component';
import { AdminFieldComponent } from './admin/admin-field/admin-field.component';
import { FieldDetailsComponent } from './user/field-details/field-details.component';

import { CurrentOfferService } from './services/current-offer.service';
import { FoundFieldService } from './services/found-field.service';

const appRoutes: Routes = [
  { path: 'offre', component: AddOfferComponent },
  { path: 'offre/:id', component: AddOfferComponent },
  { path: 'formation/:id', component: FieldDetailsComponent },
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
    FieldDetailsComponent,
    AdminStatsComponent,
    AdminDataComponent,
    AdminFieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
  ],
  providers: [
    CurrentOfferService,
    FoundFieldService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
