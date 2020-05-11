import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../services/data-mission.service';
import { Observable, Subject } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-missions-visualisation',
  templateUrl: './missions-visualisation.component.html',
  styleUrls: ['./missions-visualisation.component.scss']
})
export class MissionsVisualisationComponent implements OnInit {

  missions: Mission[];
  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;

  //Icônes
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt

  //trier par dates
  sortDateDebut = false;
  sortDateFin = false;

  constructor(private authSrv: AuthService, private missionService: DataMissionService, private router: Router) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => {
      this.collegue = data;
    });
    this.missionService.abonnementMissions().subscribe(data => this.missions = data);
    this.missionService.chargerMissions(this.collegue.email);
  }

  modifier(mission: Mission){
    this.missionService.mission = mission;
    this.router.navigate(['/mission_modification']);
  }

  supprimer(mission: Mission){
    this.missionService.delete.asObservable().subscribe(data => {
      this.missionService.chargerMissions(this.collegue.email);
    });
    this.missionService.deleteMission(mission);
  }

  trierDateDebut(){
    this.missionService.chargerMissionsDateDebut(this.collegue.email, this.sortDateDebut);
    if (this.sortDateDebut == false){this.sortDateDebut = true}
    else if (this.sortDateDebut == true){this.sortDateDebut = false}
  }

  trierDateFin(){
    this.missionService.chargerMissionsDateFin(this.collegue.email, this.sortDateFin);
    if (this.sortDateFin == false){this.sortDateFin = true}
    else if (this.sortDateFin == true){this.sortDateFin = false}
  }

}
