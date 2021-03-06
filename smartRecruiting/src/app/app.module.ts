import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

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
import { MyParamsComponent } from './user/my-params/my-params.component';

import { PredictionService } from './services/prediction.service';
import { AuthentificationService } from './services/authentification.service';
import { UserAuthGuardService } from './services/user-auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { FieldService } from './services/field.service';
import { ContactService } from './services/contact.service';
import { OfferService } from './services/offer.service';
import { UserOfferService } from './services/user-offer.service';
import { UserService } from './services/user.service';
import { StatsService } from './services/stats.service';


const appRoutes: Routes = [
  { path: 'offre', component: AddOfferComponent },
  { path: 'offre/:id', component: AddOfferComponent },
  { path: 'formation/:id', component: FieldDetailsComponent },
  { path: 'mes-offres', component: MyOffersComponent, canActivate: [UserAuthGuardService] },
  { path: 'parametres', component: MyParamsComponent, canActivate: [UserAuthGuardService] },
  { path: 'admin', redirectTo: 'admin/statistiques', pathMatch: 'full', canActivate: [AdminAuthGuardService] },
  { path: 'admin/statistiques', component: AdminStatsComponent, canActivate: [AdminAuthGuardService] },
  { path: 'admin/donnees', component: AdminDataComponent, canActivate: [AdminAuthGuardService] },
  { path: 'admin/formations', component: AdminFieldComponent, canActivate: [AdminAuthGuardService] },
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
    MyParamsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    PredictionService,
    AuthentificationService,
    UserAuthGuardService,
    AdminAuthGuardService,
    FieldService,
    ContactService,
    OfferService,
    UserOfferService,
    UserService,
    StatsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
