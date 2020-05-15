import { Nature } from './../models/Nature';
import { DataNatureService } from './../services/data-nature.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-natures-de-mission',
  templateUrl: './natures-de-mission.component.html',
  styleUrls: ['./natures-de-mission.component.scss']
})
export class NaturesDeMissionComponent implements OnInit {
  //Icônes
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt

  natures : Nature[]


  constructor(private natureService : DataNatureService) { }

  ngOnInit(): void {
    this.natureService.abonnementNatures()
      .subscribe(data => this.natures = data)
    this.natureService.getNatures()

  }

}
