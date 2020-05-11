import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../services/data-mission.service';
import { Nature } from '../models/NatureDto';
import { NatureService } from '../services/natureDto.service';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-missions-modification',
  templateUrl: './missions-modification.component.html',
  styleUrls: ['./missions-modification.component.scss']
})
export class MissionsModificationComponent implements OnInit {

  mission: Mission;
  natures: Nature[];
  erreur: boolean = false;
  erreur_date_debut: boolean = false;
  erreur_date_fin: boolean = false;
  erreur_avion: boolean = false;
  erreur_date_debut_non_travaille: boolean = false;
  erreur_date_fin_non_travaille: boolean = false;
  erreur_chevauchement: boolean = false;
  validation: boolean = false;
  collegue_non_trouve: boolean = false;
  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;

  constructor(private authSrv: AuthService, private natureService: NatureService, private dataMissionService: DataMissionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => this.collegue = data);
    this.mission = this.dataMissionService.mission;
    this.natureService.abonnementNatures().subscribe(data => this.natures = data);
    this.natureService.loadNatures();
    if (this.mission == undefined){
      this.router.navigate(['/missions_visualisation']);
    }
  }

  annuler(){

  }

  valider(){
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
          this.dataMissionService.missionModifiee.asObservable().subscribe(data=>{
            let chaine: string = data.valueOf();
            if (chaine == "modifiee"){
              this.validation = true;
              setTimeout(() => {this.validation = false }, 5000);
            }else if (chaine == "erreur:404"){
              this.collegue_non_trouve = true;
            }
          });
          this.dataMissionService.modifierMission(this.mission);
        }
      }else if (data == "erreur:404"){
        this.collegue_non_trouve = true;
      }
    });
    this.dataMissionService.verifierDisponibilite(this.mission.date_debut, this.mission.date_fin, this.collegue.email, this.mission.id);

  }

}
