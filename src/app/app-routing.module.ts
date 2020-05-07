import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionFraisComponent } from './gestion-frais/gestion-frais.component';
import { AjouterFraisComponent } from './ajouter-frais/ajouter-frais.component';


const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService]},
  { path: 'noteFrais', component: GestionFraisComponent, canActivate: [StatutConnecteService]},
  { path: 'ajouterNoteFrais', component: AjouterFraisComponent, canActivate: [StatutConnecteService]},
  { path: '', redirectTo: '/connexion', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
