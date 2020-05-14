import { NatureMissionModificationComponent } from './nature-mission-modification/nature-mission-modification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionFraisComponent } from './gestion-frais/gestion-frais.component';
import { AjouterFraisComponent } from './saisie-noteFrais/ajouter-frais.component';
import { MissionDemandeComponent } from './mission-demande/mission-demande.component';
import { MissionsVisualisationComponent } from './missions-visualisation/missions-visualisation.component';
import { MissionsModificationComponent } from './missions-modification/missions-modification.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import { MissionsPlanningComponent } from './missions-planning/missions-planning.component';


const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'nature-modification', component: NatureMissionModificationComponent, canActivate: [StatutConnecteService]},
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService]},
  { path: 'noteFrais', component: GestionFraisComponent, canActivate: [StatutConnecteService]},
  { path: 'ajouterNoteFrais/:id', component: AjouterFraisComponent, canActivate: [StatutConnecteService]},
  { path: 'mission_demande', component: MissionDemandeComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_visualisation', component: MissionsVisualisationComponent, canActivate: [StatutConnecteService]},
  { path: 'mission_modification', component: MissionsModificationComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_manager', component: MissionsManagerComponent, canActivate: [StatutConnecteService]},
  { path: 'missions_planning', component: MissionsPlanningComponent, canActivate: [StatutConnecteService]},
  { path: '', redirectTo: '/connexion', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
