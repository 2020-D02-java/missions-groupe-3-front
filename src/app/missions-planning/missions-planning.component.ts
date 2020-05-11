import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Evenement } from '../models/Evenement';
import { Mission } from '../models/Mission';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { DataMissionService } from '../services/data-mission.service';


@Component({
  selector: 'app-missions-planning',
  templateUrl: './missions-planning.component.html',
  styleUrls: ['./missions-planning.component.scss']
})
export class MissionsPlanningComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  locale: string = 'fr';
  events: Evenement[] = [];
  loadCalendar: boolean = false;
  
  missions: Mission[];
  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;

  constructor(private authSrv: AuthService, private missionService: DataMissionService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => {
      this.collegue = data;
    });
    this.missionService.abonnementMissions().subscribe(data => {
      this.missions = data;
      this.missions.forEach(value => {
        let date: Date;
        for (date = new Date(value.date_debut); date <= new Date(value.date_fin) ; date.setDate(new Date(date).getDate() + 1)){
          let event: Evenement = new Evenement(value.nature, this.convertDate(date));
          this.events.push(event);
        }
      });
      this.loadCalendar = true;
    });
    this.missionService.chargerMissions(this.collegue.email);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  convertDate(inputFormat: Date) {
    var d = new Date(inputFormat)
    return [d.getFullYear(), this.pad(d.getMonth()+1), this.pad(d.getDate())].join('-')
  }

  pad(s: number) { return (s < 10) ? '0' + s : s; }
  //////////////////////////////////////////////////////////////////////////////////////

}
