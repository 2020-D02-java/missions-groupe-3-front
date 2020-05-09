import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Mission } from '../models/Mission';
import { DataMissionService } from '../services/data-mission.service';

@Component({
  selector: 'app-missions-modification',
  templateUrl: './missions-modification.component.html',
  styleUrls: ['./missions-modification.component.scss']
})
export class MissionsModificationComponent implements OnInit {

  mission: Mission;

  constructor(private missionService: DataMissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mission = this.missionService.mission;
  }

}
