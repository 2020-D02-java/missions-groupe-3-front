import { NatureCreationComponent } from './nature-creation/nature-creation.component';
import { NaturesDeMissionComponent } from './natures-de-mission/natures-de-mission.component';
import { NatureMissionModificationComponent } from './nature-mission-modification/nature-mission-modification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionFraisComponent } from './gestion-frais/gestion-frais.component';
// import { AjouterFraisComponent } from './saisie-noteFrais/ajouter-frais.component';
import { MissionDemandeComponent } from './mission-demande/mission-demande.component';
import { MissionsVisualisationComponent } from './missions-visualisation/missions-visualisation.component';
import { MissionsModificationComponent } from './missions-modification/missions-modification.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import { MissionsPlanningComponent } from './missions-planning/missions-planning.component';
import { PrimesComponent } from './primes/primes.component';
import { GestionLigneFraisComponent } from './gestion-ligne-frais/gestion-ligne-frais.component';
import { GestionNoteFraisComponent } from './gestion-note-frais/gestion-note-frais.component';



const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'natures-de-mission', component: NaturesDeMissionComponent, canActivate: [StatutConnecteService]},
  { path: 'nature-modification', component: NatureMissionModificationComponent, canActivate: [StatutConnecteService]},
  { path: 'nature-creation', component: NatureCreationComponent, canActivate: [StatutConnecteService]},
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService]},
  { path: 'noteFrais', component: GestionNoteFraisComponent, canActivate: [StatutConnecteService]},
  { path: 'ajouterNoteFrais/:idOfNote', component: GestionLigneFraisComponent, canActivate: [StatutConnecteService]},
  { path: 'modifierLigneFrais/', component: GestionLigneFraisComponent, canActivate: [StatutConnecteService]},

  { path: 'mission_demande', component: MissionDemandeComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_visualisation', component: MissionsVisualisationComponent, canActivate: [StatutConnecteService]},
  { path: 'mission_modification', component: MissionsModificationComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_manager', component: MissionsManagerComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_planning', component: MissionsPlanningComponent, canActivate: [StatutConnecteService]},
  { path: 'primes', component: PrimesComponent, canActivate: [StatutConnecteService]},
  { path: '', redirectTo: '/connexion', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
