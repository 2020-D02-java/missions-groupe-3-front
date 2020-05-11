import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../services/data-mission.service';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Nature } from '../models/NatureDto';
import { NatureService } from '../services/natureDto.service';

@Component({
  selector: 'app-mission-demande',
  templateUrl: './mission-demande.component.html',
  styleUrls: ['./mission-demande.component.scss']
})
export class MissionDemandeComponent implements OnInit {

  constructor(private authSrv: AuthService, private dataMissionService: DataMissionService, private natureService: NatureService) { }

  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;
  natures: Nature[];
  mission: Mission = new Mission(null, null, null, null, '', '', '', '', '', '');
  erreur: boolean = false;
  erreur_date_debut: boolean = false;
  erreur_date_fin: boolean = false;
  erreur_avion: boolean = false;
  erreur_date_debut_non_travaille: boolean = false;
  erreur_date_fin_non_travaille: boolean = false;
  erreur_chevauchement: boolean = false;
  validation: boolean = false;
  collegue_non_trouve: boolean = false;

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => this.collegue = data);
    this.natureService.abonnementNatures().subscribe(data => this.natures = data);
    this.natureService.loadNatures();
  }

  annuler(){
    this.mission = new Mission(null, null, null, null, '', '', '', '','', '');
    this.erreur = false;
    this.erreur_date_debut = false;
    this.erreur_date_fin = false;
    this.erreur_avion = false;
    this.erreur_date_debut_non_travaille  = false;
    this.erreur_date_fin_non_travaille  = false;
    this.erreur_chevauchement = false;
    this.collegue_non_trouve = false;
  }

  validerCreation(){
    this.validation = false;
    this.erreur = false;
    this.collegue_non_trouve = false;
    //la date de debut doit etre superieure a la date du jour
    if (this.mission.date_debut != null && new Date(this.mission.date_debut) > new Date()){
      this.erreur_date_debut = false;
    }else{
      this.erreur_date_debut = true;
      this.erreur = true;
    }
    //la date de fin doit etre superieure a la date de debut
    if (this.mission.date_fin != null && new Date(this.mission.date_fin) >= new Date(this.mission.date_debut)){
      this.erreur_date_fin = false;
    }else{
      this.erreur_date_fin = true;
      this.erreur = true;
    }
    //la date de debut doit etre superieure de 7 jours de la date du jour si l'avion est le mode de transport
    const dateDebut = new Date(this.mission.date_debut);
    const dateFin = new Date(this.mission.date_fin);
    let dateAvion = new Date();
    dateAvion.setDate(dateAvion.getDate() + 7);
    if (this.mission.transport=="avion" && dateDebut > dateAvion){
      this.erreur_avion = false;
    }else if (this.mission.transport == "avion"){
      this.erreur_avion = true;
      this.erreur = true;
    }
    //verifie si un jour definit est un jour non travaillé
    if (dateDebut.getDay() == 0 || dateDebut.getDay() == 6){
      this.erreur = true;
      this.erreur_date_debut_non_travaille = true;
    }else{
      this.erreur_date_debut_non_travaille = false;
    }
    if (dateFin.getDay() == 0 || dateFin.getDay() == 6){
      this.erreur = true;
      this.erreur_date_fin_non_travaille = true;
    }else{
      this.erreur_date_fin_non_travaille = false;
    }
    //verifie si une autre mission n'est pas sur le créneau définit
    this.dataMissionService.abonnementDisponibiliteMission()
    .subscribe(data => {
      if(data == "false"){
        this.erreur_chevauchement = true;
        this.erreur = true;
      }else if (data == "true"){
        this.erreur_chevauchement = false;
        if (!this.erreur){//si il n'y a pas d'erreurs le statut est a initiale et on peut l'insérer en base
          this.mission.statut="INITIALE";
          this.mission.collegue_email = this.collegue.email;
          this.dataMissionService.creerMission(this.mission);
          this.dataMissionService.abonnementMissionCree().subscribe(data=>{
            let chaine: string = data.valueOf();
            if (chaine == "cree"){
              this.validation = true;
              setTimeout(() => {this.validation = false }, 5000);
            this.mission = new Mission(null, null, null, null, '', '', '', '','', '');
            }else if (chaine == "erreur:404"){
              this.collegue_non_trouve = true;
            }
          });
        }
      }else if (data == "erreur:404"){
        this.collegue_non_trouve = true;
      }
    });
    this.dataMissionService.verifierDisponibilite(this.mission.date_debut, this.mission.date_fin, this.collegue.email, -1);
    
  }
}
  