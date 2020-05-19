import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../services/data-mission.service';
import { Nature } from '../models/NatureDto';

@Component({
  selector: 'app-missions-manager',
  templateUrl: './missions-manager.component.html',
  styleUrls: ['./missions-manager.component.scss']
})
export class MissionsManagerComponent implements OnInit {

  collegue: Collegue;
  collegueConnecte: Observable<Collegue>;
  manager: boolean = false;
  missions: Mission[];
  triDateDebut: boolean = false;
  triDateFin: boolean = false;

  constructor(private authSrv: AuthService, private missionsService: DataMissionService) {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => {
      this.collegue = data;
      if (this.collegue.roles != undefined) {
        this.collegue.roles.forEach(value => {
          if (value == "ROLE_MANAGER") { this.manager = true; }
        });
      }
    });
  }

  ngOnInit(): void {
    this.missionsService.loadMissionAttente(this.collegue.email, "", false, false);
    this.missionsService.missions.asObservable().subscribe(data => {
      this.missions = data;
      this.missions.forEach(value => {
        if (value.nature == null || value.nature.nom == null){
          value.nature = new Nature(-1, '');
        }
      });
    });
  }

  validerDemande(mission: Mission) {
    this.missionsService.validationMission(true, mission.id);
    this.missionsService.loadMissionAttente(this.collegue.email, "", false, false);
  }

  rejeterDemande(mission: Mission) {
    this.missionsService.validationMission(false, mission.id);
    this.missionsService.loadMissionAttente(this.collegue.email, "", false, false);
  }

  trierMissionsDateDebut() {
    if (this.triDateDebut) { this.missionsService.loadMissionAttente(this.collegue.email, "debut", false, false); }
    else { this.missionsService.loadMissionAttente(this.collegue.email, "debut", true, false); }
    if (this.triDateDebut) { this.triDateDebut = false; }
    else { this.triDateDebut = true; }
  }

  trierMissionsDateFin() {
    if (this.triDateFin) { this.missionsService.loadMissionAttente(this.collegue.email, "fin", false, false); }
    else { this.missionsService.loadMissionAttente(this.collegue.email, "fin", false, true); }
    if (this.triDateFin) { this.triDateFin = false; }
    else { this.triDateFin = true; }
  }

}
