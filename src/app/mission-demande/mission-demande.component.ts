import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../data-mission.service';

@Component({
  selector: 'app-mission-demande',
  templateUrl: './mission-demande.component.html',
  styleUrls: ['./mission-demande.component.scss']
})
export class MissionDemandeComponent implements OnInit {

  constructor(private dataMissionService: DataMissionService) { }

  mission: Mission = new Mission(null, null, '', '', '', '', '');
  erreur: boolean = false;
  erreur_date_debut: boolean = false;
  erreur_date_fin: boolean = false;
  erreur_avion: boolean = false;
  erreur_date_debut_non_travaille: boolean = false;
  erreur_date_fin_non_travaille: boolean = false;
  erreur_chevauchement: boolean = false;

  ngOnInit(): void {
  }

  annuler(){
    this.mission = new Mission(null, null, '', '', '', '','');
  }

  valider(){
    this.erreur = false;
    //la date de debut doit etre superieure a la date du jour
    if (this.mission.date_debut != null && new Date(this.mission.date_debut) > new Date()){
      this.erreur_date_debut = false;
    }else{
      this.erreur_date_debut = true;
      this.erreur = true;
    }
    //la date de fin doit etre superieure a la date de debut
    if (this.mission.date_fin != null && new Date(this.mission.date_fin) > new Date(this.mission.date_debut)){
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
      if(data == false){
        this.erreur_chevauchement = true;
        this.erreur = true;
      }else {
        if (!this.erreur){//si il n'y a pas d'erreurs le statut est a initiale et on peut l'insérer en base
          this.mission.statut="INITIALE";
          console.log("validation");
        }
      }
    });
    this.dataMissionService.verifierDisponibilite(this.mission.date_debut, this.mission.date_fin);
    
  }
}
  