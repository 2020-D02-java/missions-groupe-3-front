import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { RouterModule, Routes } from '@angular/router';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TechComponent } from './tech/tech.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuComponent } from './menu/menu.component';
import { CollapseNavbarComponent } from 'src/app/collapse-navbar/collapse-navbar.component';
import { NaturesDeMissionComponent } from './natures-de-mission/natures-de-mission.component';
import { GestionFraisComponent } from './gestion-frais/gestion-frais.component';
import { MissionDemandeComponent } from './mission-demande/mission-demande.component';
import { GestionFraisService } from './services/gestion-frais.service';
import { MissionsVisualisationComponent } from './missions-visualisation/missions-visualisation.component';
import { MissionsModificationComponent } from './missions-modification/missions-modification.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import { MissionsPlanningComponent } from './missions-planning/missions-planning.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PrimesComponent } from './primes/primes.component';
import { GoogleChartsModule } from 'angular-google-charts'

registerLocaleData(localeFr);
import { NatureMissionModificationComponent } from './nature-mission-modification/nature-mission-modification.component';
import { NatureCreationComponent } from './nature-creation/nature-creation.component';
import { GestionNoteFraisComponent } from './gestion-note-frais/gestion-note-frais.component';
import { GestionLigneFraisComponent } from './gestion-ligne-frais/gestion-ligne-frais.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    ConnexionComponent,
    AccueilComponent,
    MenuComponent,
    NaturesDeMissionComponent,
    CollapseNavbarComponent,
    GestionFraisComponent,
    GestionLigneFraisComponent,
    CollapseNavbarComponent,
    MissionDemandeComponent,
    CollapseNavbarComponent,
    MissionsVisualisationComponent,
    MissionsModificationComponent,
    MissionsManagerComponent,
    MissionsPlanningComponent,
    CollapseNavbarComponent,
    NatureMissionModificationComponent,
    PrimesComponent,
    NatureCreationComponent,
    GestionNoteFraisComponent,
    GestionLigneFraisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    FullCalendarModule,
    GoogleChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, GestionFraisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
