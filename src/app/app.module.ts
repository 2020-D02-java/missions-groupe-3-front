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
import { MissionsVisualisationComponent } from './missions-visualisation/missions-visualisation.component';
import { MissionsModificationComponent } from './missions-modification/missions-modification.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import { MissionsPlanningComponent } from './missions-planning/missions-planning.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


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
    MissionDemandeComponent,
    CollapseNavbarComponent,
    MissionsVisualisationComponent,
    MissionsModificationComponent,
    MissionsManagerComponent,
    MissionsPlanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    FullCalendarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, GestionFraisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
