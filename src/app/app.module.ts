import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TechComponent } from './tech/tech.component';
import { RouterModule, Routes } from '@angular/router';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuComponent } from './menu/menu.component';
import { GestionFraisComponent } from './gestion-frais/gestion-frais.component';
import { MissionDemandeComponent } from './mission-demande/mission-demande.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AjouterFraisComponent } from './saisie-noteFrais/ajouter-frais.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseNavbarComponent } from './collapse-navbar/collapse-navbar.component';
import { GestionFraisService } from './services/gestion-frais.service';
import { AjouterLigneComponent } from './ajouter-ligne/ajouter-ligne.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MissionsVisualisationComponent } from './missions-visualisation/missions-visualisation.component';
import { MissionsModificationComponent } from './missions-modification/missions-modification.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import { MissionsPlanningComponent } from './missions-planning/missions-planning.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PrimesComponent } from './primes/primes.component';
import { GoogleChartsModule } from 'angular-google-charts';

registerLocaleData(localeFr);
import { NatureMissionModificationComponent } from './nature-mission-modification/nature-mission-modification.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    ConnexionComponent,
    AccueilComponent,
    MenuComponent,
    GestionFraisComponent,
    AjouterFraisComponent,
    CollapseNavbarComponent,
    AjouterLigneComponent,
    MissionDemandeComponent,
    CollapseNavbarComponent,
    MissionsVisualisationComponent,
    MissionsModificationComponent,
    MissionsManagerComponent,
    MissionsPlanningComponent,
    CollapseNavbarComponent,
    NatureMissionModificationComponent,
    PrimesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FullCalendarModule,
    GoogleChartsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, GestionFraisService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
